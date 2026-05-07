import path from "path";
import fs from "fs/promises";
import { chromium, firefox, webkit } from "@playwright/test";
import { randomUUID } from "crypto";
import type { AutomationRunPayload, AutomationResult } from "@/types";

const viewportPresets = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 414, height: 896 },
};

const browserMap = {
  chromium,
  firefox,
  webkit,
};

export async function runAutomation(payload: AutomationRunPayload): Promise<AutomationResult> {
  const runId = `run_${randomUUID().slice(0, 8)}`;
  const root = process.cwd();
  const screenshotDir = path.join(root, "reports", "screenshots");
  const traceDir = path.join(root, "reports", "traces");

  await fs.mkdir(screenshotDir, { recursive: true });
  await fs.mkdir(traceDir, { recursive: true });

  const screenshotPath = path.join(screenshotDir, `${runId}.png`);
  const tracePath = path.join(traceDir, `${runId}.zip`);

  const browserType = browserMap[payload.browser];
  const browser = await browserType.launch({ headless: true });
  const context = await browser.newContext({
    viewport: viewportPresets[payload.viewport],
    recordVideo: { dir: path.join(root, "reports", "videos") },
  });

  await context.tracing.start({ screenshots: true, snapshots: true });

  const page = await context.newPage();
  const logs: string[] = [];
  const networkErrors: Array<{ url: string; message: string }> = [];

  page.on("console", (msg) => {
    logs.push(`${msg.type()}: ${msg.text()}`);
  });

  page.on("pageerror", (error) => {
    logs.push(`pageerror: ${error.message}`);
  });

  page.on("requestfailed", (request) => {
    networkErrors.push({ url: request.url(), message: request.failure()?.errorText || "request-failed" });
  });

  const startTime = Date.now();
  let status: AutomationResult["status"] = "passed";
  let pageTitle = "";
  const brokenLinkResults: Array<{ href: string; status: number | null; ok: boolean }> = [];
  let apiValidation;

  try {
    const response = await page.goto(payload.url, { waitUntil: "networkidle", timeout: 30000 });

    if (!response || response.status() >= 400) {
      status = "failed";
      logs.push(`navigation: ${payload.url} returned ${response?.status() ?? "unknown"}`);
    }

    pageTitle = await page.title();

    const buttonCount = await page.locator("button, [role='button']").count();
    if (buttonCount === 0) {
      logs.push("button-check: no interactive buttons detected on the page");
      status = "failed";
    }

    const pageScreenshot = await page.screenshot({ path: screenshotPath, fullPage: true });

    const anchorUrls = await page.$$eval("a[href]", (anchors) =>
      anchors
        .map((anchor) => (anchor as HTMLAnchorElement).href)
        .filter(Boolean)
        .slice(0, 30)
    );

    const brokenLinkResults = [] as Array<{ href: string; status: number | null; ok: boolean }>;
    for (const href of anchorUrls) {
      try {
        const response = await page.request.get(href, { timeout: 10000 });
        brokenLinkResults.push({ href, status: response.status(), ok: response.ok() });
        if (!response.ok()) {
          status = "failed";
        }
      } catch (error) {
        brokenLinkResults.push({ href, status: null, ok: false });
        status = "failed";
      }
    }

    const firstForm = await page.$("form");
    if (firstForm) {
      try {
        await page.fill("input[type='email']", "qa@example.com").catch(() => null);
        await page.fill("input[type='password']", "Password123!").catch(() => null);
        await page.fill("input[type='text']", "Automation Test").catch(() => null);
        await page.click("button[type='submit'], input[type='submit']", { timeout: 8000 }).catch(() => null);
      } catch (error) {
        logs.push(`form-interaction: ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    if (payload.testType === "api") {
      try {
        const apiResponse = await page.request.get(payload.url, { timeout: 30000 });
        const jsonPreview = await apiResponse.text();
        apiValidation = {
          status: apiResponse.status(),
          success: apiResponse.ok(),
          jsonPreview: jsonPreview.slice(0, 120),
        };
        if (!apiResponse.ok()) {
          status = "failed";
        }
      } catch (error) {
        apiValidation = {
          status: 0,
          success: false,
          jsonPreview: "API request failed",
        };
        status = "failed";
      }
    }

    await context.tracing.stop({ path: tracePath });
    await fs.writeFile(path.join(root, "reports", "screenshots", `${runId}.txt`), logs.join("\n"), "utf8");
  } catch (error) {
    status = "failed";
    logs.push(`automation-error: ${error instanceof Error ? error.message : String(error)}`);
    await context.tracing.stop({ path: tracePath }).catch(() => null);
  } finally {
    await browser.close();
  }

  return {
    runId,
    status,
    durationMs: Date.now() - startTime,
    browser: payload.browser,
    viewport: payload.viewport,
    url: payload.url,
    screenshotPath: screenshotPath.replace(process.cwd(), ""),
    tracePath: tracePath.replace(process.cwd(), ""),
    logs: logs.concat(networkErrors.map((item) => `network-error: ${item.url} ${item.message}`)),
    brokenLinks: brokenLinkResults,
    pageTitle,
    apiValidation,
  };
}

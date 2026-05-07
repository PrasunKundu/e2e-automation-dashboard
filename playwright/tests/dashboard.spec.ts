import { expect, test } from "@playwright/test";

test("dashboard loads and launches automation workflow", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("AI-Powered E2E Automation Dashboard")).toBeVisible();
  await expect(page.getByText("Create Test Run")).toBeVisible();

  await page.fill("#url", "https://example.com");
  await page.selectOption("#browser", "chromium");
  await page.selectOption("#viewport", "desktop");
  await page.selectOption("#testType", "regression");

  await page.click("text=Launch run");
  await expect(page.locator("text=Execution queued")).toBeVisible({ timeout: 15000 });
});

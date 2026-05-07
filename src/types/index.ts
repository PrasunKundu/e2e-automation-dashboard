export type BrowserName = "chromium" | "firefox" | "webkit";

export type TestType = "regression" | "smoke" | "api";

export interface AutomationRunPayload {
  url: string;
  browser: BrowserName;
  viewport: "desktop" | "tablet" | "mobile";
  testType: TestType;
  goal?: string;
}

export interface AutomationResult {
  runId: string;
  status: "passed" | "failed" | "running";
  durationMs: number;
  browser: BrowserName;
  viewport: string;
  url: string;
  screenshotPath: string;
  tracePath: string;
  logs: string[];
  brokenLinks: Array<{ href: string; status: number | null; ok: boolean }>;
  pageTitle: string;
  apiValidation?: {
    status: number;
    success: boolean;
    jsonPreview: string;
  };
}

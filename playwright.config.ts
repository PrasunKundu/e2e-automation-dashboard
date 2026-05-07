import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "playwright/tests",
  timeout: 60000,
  expect: {
    timeout: 5000,
  },
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    actionTimeout: 10000,
    baseURL: "http://localhost:3000",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run start",
    port: 3000,
    timeout: 120000,
    reuseExistingServer: process.env.CI !== "true",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
  outputDir: "reports/playwright",
};

export default config;

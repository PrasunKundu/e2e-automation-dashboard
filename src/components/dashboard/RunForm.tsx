"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const browsers = [
  { label: "Chromium", value: "chromium" },
  { label: "Firefox", value: "firefox" },
  { label: "WebKit", value: "webkit" },
];

const viewports = [
  { label: "Desktop 1440x900", value: "desktop" },
  { label: "Tablet 768x1024", value: "tablet" },
  { label: "Mobile 414x896", value: "mobile" },
];

const testTypes = [
  { label: "Regression", value: "regression" },
  { label: "Smoke", value: "smoke" },
  { label: "API Validation", value: "api" },
];

export function RunForm() {
  const [url, setUrl] = useState("https://example.com");
  const [browser, setBrowser] = useState("chromium");
  const [viewport, setViewport] = useState("desktop");
  const [testType, setTestType] = useState("regression");
  const [goal, setGoal] = useState("Validate page load and main user flows.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/runs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, browser, viewport, testType, goal }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error?.message || "Failed to create run");
      }

      const result = await response.json();
      setMessage(`Execution queued: ${result.runId} — ${result.status}`);
      setUrl(url.trim());
    } catch (error) {
      setMessage(
        error instanceof Error
          ? `Error: ${error.message}`
          : "Unexpected automation failure"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="run-test"
      className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-slate-950/30"
    >
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Create Test Run
        </p>
        <h2 className="text-2xl font-semibold text-slate-50">
          Launch cross-browser automation
        </h2>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Choose a browser, viewport, and test profile to capture screenshots,
          traces, and automation logs in a developer-ready workflow.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="url">Website URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://dashboard.example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal">Testing goal</Label>
          <Textarea
            id="goal"
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="Validate form submission, console errors, and page topology."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="browser">Browser</Label>
          <Select
            id="browser"
            value={browser}
            onChange={(event) => setBrowser(event.target.value)}
          >
            {browsers.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="viewport">Viewport</Label>
          <Select
            id="viewport"
            value={viewport}
            onChange={(event) => setViewport(event.target.value)}
          >
            {viewports.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="testType">Test type</Label>
          <Select
            id="testType"
            value={testType}
            onChange={(event) => setTestType(event.target.value)}
          >
            {testTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-end justify-between gap-4 sm:col-span-2">
          <div className="text-sm leading-6 text-slate-400">
            This workflow starts a Playwright run, captures a screenshot, and
            stores runtime metadata.
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Starting run..." : "Launch run"}
          </Button>
        </div>
      </form>

      {message ? (
        <div className="mt-5 rounded-3xl border border-slate-700/80 bg-slate-900/80 px-4 py-3 text-sm text-slate-200">
          {message}
        </div>
      ) : null}
    </section>
  );
}

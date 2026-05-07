import { NextRequest, NextResponse } from "next/server";
import { runAutomation } from "@/lib/playwright/runner";
import { supabase, hasSupabaseConfig } from "@/lib/supabaseClient";
import type { AutomationRunPayload } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as AutomationRunPayload;
    const result = await runAutomation(payload);

    if (hasSupabaseConfig()) {
      await supabase.from("test_runs").insert({
        run_id: result.runId,
        url: result.url,
        browser: result.browser,
        viewport: result.viewport,
        status: result.status,
        duration_ms: result.durationMs,
        page_title: result.pageTitle,
        logs: result.logs,
        broken_links: result.brokenLinks,
        trace_path: result.tracePath,
        screenshot_path: result.screenshotPath,
      });
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Automation failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (!hasSupabaseConfig()) {
    return NextResponse.json({
      runs: [
        {
          run_id: "run_demo_001",
          url: "https://example.com",
          browser: "chromium",
          viewport: "desktop",
          status: "passed",
          duration_ms: 18234,
          page_title: "Example Domain",
          created_at: new Date().toISOString(),
        },
      ],
    });
  }

  const { data, error } = await supabase
    .from("test_runs")
    .select("run_id, url, browser, viewport, status, duration_ms, page_title, created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json(
      { message: error.message, runs: [] },
      { status: 500 }
    );
  }

  return NextResponse.json({ runs: data || [] });
}

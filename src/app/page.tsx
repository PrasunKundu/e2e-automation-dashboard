import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { RunForm } from "@/components/dashboard/RunForm";
import { ExecutionTable } from "@/components/dashboard/ExecutionTable";
import { Activity, BarChart3, Cloud, Terminal } from "lucide-react";

const metrics = [
  {
    label: "Runs executed",
    value: "412",
    icon: Activity,
  },
  {
    label: "Failure rate",
    value: "8.3%",
    icon: Cloud,
  },
  {
    label: "Avg duration",
    value: "38s",
    icon: BarChart3,
  },
  {
    label: "Browsers supported",
    value: "3",
    icon: Terminal,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1440px] gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
        <Sidebar />

        <main className="space-y-8">
          <section className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-8 shadow-2xl shadow-slate-950/30">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">
                  QA Automation Platform
                </p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  AI-Powered E2E Automation Dashboard
                </h1>
                <p className="mt-5 max-w-3xl text-base leading-7 text-slate-400">
                  Launch browser workflows, validate APIs, and debug failed test
                  executions with a developer-first observability experience.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="default">View Execution Center</Button>
                <Button variant="secondary">Open AI Test Generator</Button>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <Card key={metric.label} className="border-white/10 bg-slate-950/95">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                        {metric.label}
                      </p>
                      <div className="flex h-10 w-10 items-center justify-center rounded-3xl bg-slate-900 text-slate-200">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <CardTitle className="mt-4 text-3xl">{metric.value}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </section>

          <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6">
              <RunForm />
              <ExecutionTable />
            </div>

            <div className="space-y-6">
              <Card className="border-white/10 bg-slate-950/95">
                <CardHeader>
                  <CardTitle>Automated regression insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm leading-6 text-slate-300">
                    <p>
                      Each execution captures screenshots, Playwright traces, network
                      failures, and console diagnostics. Save time by surfacing the
                      first failing step and exporting trace artifacts.
                    </p>
                    <div className="grid gap-3">
                      <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
                        <p className="text-sm text-slate-400">Automated checks included</p>
                        <ul className="mt-3 space-y-2 text-slate-300">
                          <li>• Page load validation</li>
                          <li>• Button and form interaction</li>
                          <li>• Broken link detection</li>
                          <li>• API response validation</li>
                          <li>• Console and network error capture</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-slate-950/95">
                <CardHeader>
                  <CardTitle>Deployment readiness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-slate-300">
                    <p>
                      A GitHub Actions workflow runs Playwright tests and uploads
                      trace artifacts. Connect a Supabase project to persist test
                      results and enable auth for developer teams.
                    </p>
                    <Badge className="bg-slate-800 text-slate-200">CI/CD enabled</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

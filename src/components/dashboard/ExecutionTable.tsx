import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusPill } from "@/components/dashboard/StatusPill";
import { ArrowRight, Clock3, Globe2, Layers } from "lucide-react";

export interface TestRunSummary {
  id: string;
  name: string;
  browser: string;
  status: "passed" | "failed" | "running";
  duration: string;
  executedAt: string;
  failures: number;
}

const sampleRuns: TestRunSummary[] = [
  {
    id: "RUN-001",
    name: "Homepage smoke validation",
    browser: "chromium",
    status: "passed",
    duration: "24s",
    executedAt: "2 min ago",
    failures: 0,
  },
  {
    id: "RUN-002",
    name: "Checkout flow regression",
    browser: "firefox",
    status: "failed",
    duration: "1m 12s",
    executedAt: "14 min ago",
    failures: 3,
  },
  {
    id: "RUN-003",
    name: "API contract validation",
    browser: "webkit",
    status: "running",
    duration: "12s",
    executedAt: "Just now",
    failures: 0,
  },
];

export function ExecutionTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Test Executions</CardTitle>
          </div>
          <Badge>Realtime</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full border-separate border-spacing-0 text-sm text-slate-300">
            <thead className="bg-slate-950/90 text-left text-xs uppercase tracking-[0.24em] text-slate-500">
              <tr>
                <th className="px-5 py-4">Execution</th>
                <th className="px-5 py-4">Browser</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Duration</th>
                <th className="px-5 py-4">Started</th>
                <th className="px-5 py-4">Insights</th>
              </tr>
            </thead>
            <tbody>
              {sampleRuns.map((run) => (
                <tr
                  key={run.id}
                  className="border-t border-white/5 bg-slate-950/70 transition hover:bg-slate-900"
                >
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-100">{run.name}</div>
                    <div className="text-xs text-slate-500">{run.id}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs text-slate-300">
                      <Layers className="h-3.5 w-3.5" />
                      {run.browser}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusPill status={run.status} />
                  </td>
                  <td className="px-5 py-4">{run.duration}</td>
                  <td className="px-5 py-4">{run.executedAt}</td>
                  <td className="px-5 py-4 text-slate-400">
                    <div className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4" />
                      {run.failures === 0
                        ? "No regressions"
                        : `${run.failures} failure(s)`}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex items-center justify-end gap-2 text-sm text-slate-400">
          <ArrowRight className="h-4 w-4" />
          View history in the execution center
        </div>
      </CardContent>
    </Card>
  );
}

import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  passed: "bg-emerald-500/10 text-emerald-200 border border-emerald-500/20",
  failed: "bg-rose-500/10 text-rose-200 border border-rose-500/20",
  running: "bg-amber-500/10 text-amber-200 border border-amber-500/20",
};

export function StatusPill({
  status,
}: {
  status: "passed" | "failed" | "running" | string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold tracking-[0.12em] uppercase",
        statusStyles[status] ?? "bg-slate-700 text-slate-200"
      )}
    >
      {status}
    </span>
  );
}

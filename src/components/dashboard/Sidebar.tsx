import Link from "next/link";
import { Activity, LayoutDashboard, ShieldCheck, Sparkles, Telescope, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Executions", href: "/", icon: Activity },
  { label: "Run Test", href: "#run-test", icon: Zap },
  { label: "AI Generator", href: "#ai", icon: Sparkles },
  { label: "Observability", href: "#observability", icon: Telescope },
  { label: "Security", href: "#api", icon: ShieldCheck },
];

export function Sidebar() {
  return (
    <aside className="hidden xl:flex xl:w-72 xl:flex-col xl:border-r xl:border-white/10 xl:bg-slate-950/95 xl:px-6 xl:py-8">
      <div className="mb-10 flex items-center gap-3 text-slate-100">
        <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-slate-900 text-slate-50 shadow-lg shadow-slate-950/40">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">E2E Labs</p>
          <h1 className="text-xl font-semibold">AI Automation</h1>
        </div>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-900/80 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

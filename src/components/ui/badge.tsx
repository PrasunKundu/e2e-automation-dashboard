import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

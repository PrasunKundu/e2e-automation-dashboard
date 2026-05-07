import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "default" | "secondary" | "ghost" | "danger";
}

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-slate-400",
  secondary:
    "bg-slate-700 text-slate-100 hover:bg-slate-600 focus-visible:ring-slate-400",
  ghost:
    "bg-transparent text-slate-100 hover:bg-white/10 focus-visible:ring-slate-400",
  danger:
    "bg-rose-600 text-white hover:bg-rose-500 focus-visible:ring-rose-400",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

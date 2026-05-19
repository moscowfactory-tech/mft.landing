import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const baseClasses =
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-transparent bg-zinc-100 text-black",
  secondary: "border-transparent bg-zinc-800 text-white",
  destructive: "border-transparent bg-red-600 text-white",
  outline: "border-zinc-500 text-white",
};

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      {...props}
    />
  );
}

export { Badge };

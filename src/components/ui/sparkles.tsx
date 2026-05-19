"use client";

import React from "react";
import { cn } from "@/lib/utils";

type SparklesProps = {
  className?: string;
  size?: number;
  minSize?: number | null;
  density?: number;
  speed?: number;
  minSpeed?: number | null;
  opacity?: number;
  opacitySpeed?: number;
  minOpacity?: number | null;
  color?: string;
  background?: string;
  options?: Record<string, unknown>;
};

export function Sparkles({ className }: SparklesProps) {
  return (
    <div
      className={cn(
        "pointer-events-none relative h-full w-full overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_center,var(--gradient-color),transparent_70%)] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,var(--sparkles-color)/18_1px,transparent_0)] [background-size:22px_22px] animate-pulse" />
    </div>
  );
}

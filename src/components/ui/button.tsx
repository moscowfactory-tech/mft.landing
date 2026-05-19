import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const baseClasses =
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
  default: "bg-white text-black hover:bg-zinc-200",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline:
    "border border-zinc-700 bg-transparent text-white hover:bg-zinc-900/60",
  secondary: "bg-zinc-800 text-white hover:bg-zinc-700",
  ghost: "bg-transparent hover:bg-zinc-900/60 text-white",
  link: "text-white underline-offset-4 hover:underline bg-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };

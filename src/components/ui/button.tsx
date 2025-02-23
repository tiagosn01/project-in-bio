import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export default function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "whitespace-nowrap rounded-xl p-3 font-bold text-white hover:opacity-95 disabled:opacity-70",
        variant === "primary" && "bg-accent-purple",
        variant === "secondary" && "bg-background-tertiary",
        variant === "ghost" && "border-border-primary",
        props.className,
      )}
    >
      {children}
    </button>
  );
}

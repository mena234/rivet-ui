import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "neutral" | "info" | "success" | "warning" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  dot?: boolean;
  icon?: ReactNode;
}

export function Badge({
  className,
  tone = "neutral",
  dot = false,
  icon,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn("rv-badge", className)} data-tone={tone} {...props}>
      {dot ? <span className="rv-badge__dot" aria-hidden="true" /> : null}
      {icon ? <span className="rv-badge__icon">{icon}</span> : null}
      {children}
    </span>
  );
}

import type { HTMLAttributes, ReactNode } from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, LoaderCircle, SearchX } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export type AlertTone = "info" | "success" | "warning" | "error";
export interface AlertProps extends HTMLAttributes<HTMLDivElement> { tone?: AlertTone; title: string; action?: ReactNode }

const alertIcons = { info: Info, success: CheckCircle2, warning: AlertTriangle, error: AlertCircle };

export function Alert({ tone = "info", title, action, children, className, ...props }: AlertProps) {
  const Icon = alertIcons[tone];
  return (
    <div className={cn("rv-alert", className)} data-tone={tone} role={tone === "error" ? "alert" : "status"} {...props}>
      <Icon aria-hidden="true" />
      <div><strong>{title}</strong>{children ? <div className="rv-alert__body">{children}</div> : null}</div>
      {action ? <div className="rv-alert__action">{action}</div> : null}
    </div>
  );
}

export interface ProgressBarProps { value?: number; label?: string; showValue?: boolean; size?: "sm" | "md"; tone?: "accent" | "success" }
export function ProgressBar({ value, label = "Progress", showValue = false, size = "md", tone = "accent" }: ProgressBarProps) {
  const clamped = value === undefined ? undefined : Math.min(100, Math.max(0, value));
  return (
    <div className="rv-progress-bar" data-size={size} data-tone={tone}>
      {(label || showValue) ? <div className="rv-progress-bar__meta"><span>{label}</span>{showValue && clamped !== undefined ? <strong>{clamped}%</strong> : null}</div> : null}
      <div className="rv-progress-bar__track" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={clamped} aria-busy={clamped === undefined || undefined}>
        <span data-indeterminate={clamped === undefined || undefined} style={clamped === undefined ? undefined : { transform: `scaleX(${clamped / 100})` }} />
      </div>
    </div>
  );
}

export function Spinner({ label = "Loading", size = "md" }: { label?: string; size?: "sm" | "md" | "lg" }) {
  return <span className="rv-spinner" data-size={size} role="status"><LoaderCircle aria-hidden="true" /><span className="rv-sr-only">{label}</span></span>;
}

export function Skeleton({ width = "100%", height = "1rem", rounded = false, className }: { width?: string | number; height?: string | number; rounded?: boolean; className?: string }) {
  return <span className={cn("rv-skeleton", className)} data-rounded={rounded || undefined} style={{ width, height }} aria-hidden="true" />;
}

export interface EmptyStateProps { title: string; description: string; icon?: ReactNode; actionLabel?: string; onAction?: () => void }
export function EmptyState({ title, description, icon, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="rv-empty-state">
      <span className="rv-empty-state__mark">{icon ?? <SearchX aria-hidden="true" />}</span>
      <h3>{title}</h3><p>{description}</p>
      {actionLabel ? <Button variant="primary" onClick={onAction}>{actionLabel}</Button> : null}
    </div>
  );
}

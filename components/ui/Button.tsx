"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger";
export type ButtonSize = "sm" | "md" | "lg" | "icon";
export type ButtonState = "idle" | "loading" | "error" | "success";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  state?: ButtonState;
  leadingIcon?: ReactNode;
}

export function Button({
  className,
  variant = "secondary",
  size = "md",
  state = "idle",
  leadingIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const isLoading = state === "loading";
  const stateIcon =
    state === "loading" ? (
      <LoaderCircle className="rv-button__spinner" aria-hidden="true" />
    ) : state === "success" ? (
      <Check aria-hidden="true" />
    ) : state === "error" ? (
      <TriangleAlert aria-hidden="true" />
    ) : (
      leadingIcon
    );

  return (
    <button
      className={cn("rv-button", className)}
      data-variant={variant}
      data-size={size}
      data-state={state}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {stateIcon ? <span className="rv-button__icon">{stateIcon}</span> : null}
      {children ? <span className="rv-button__label">{children}</span> : null}
    </button>
  );
}

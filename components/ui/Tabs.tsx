"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface TabItem {
  value: string;
  label: string;
  count?: number;
  content?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  fitted?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  fitted = false,
  ariaLabel = "Sections",
  className,
}: TabsProps) {
  const id = useId();
  const firstEnabled = items.find((item) => !item.disabled)?.value ?? "";
  const [internalValue, setInternalValue] = useState(defaultValue ?? firstEnabled);
  const activeValue = value ?? internalValue;

  function select(nextValue: string) {
    if (value === undefined) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const enabled = items.filter((item) => !item.disabled);
    const currentIndex = enabled.findIndex((item) => item.value === activeValue);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % enabled.length;
    if (event.key === "ArrowLeft") nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = enabled.length - 1;
    const next = enabled[nextIndex];
    select(next.value);
    requestAnimationFrame(() => {
      document.getElementById(`${id}-tab-${next.value}`)?.focus({ preventScroll: true });
    });
  }

  return (
    <div className={cn("rv-tabs", className)} data-fitted={fitted || undefined}>
      <div className="rv-tabs__list" role="tablist" aria-label={ariaLabel} onKeyDown={handleKeyDown}>
        {items.map((item) => {
          const selected = item.value === activeValue;
          return (
            <button
              className="rv-tabs__tab"
              type="button"
              role="tab"
              id={`${id}-tab-${item.value}`}
              key={item.value}
              aria-selected={selected}
              aria-controls={item.content !== undefined ? `${id}-panel-${item.value}` : undefined}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => select(item.value)}
            >
              <span>{item.label}</span>
              {item.count !== undefined ? <span className="rv-tabs__count">{item.count}</span> : null}
            </button>
          );
        })}
      </div>
      {items.map((item) => item.content !== undefined ? (
        <div
          className="rv-tabs__panel"
          id={`${id}-panel-${item.value}`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${item.value}`}
          tabIndex={0}
          hidden={item.value !== activeValue}
          key={item.value}
        >
          {item.content}
        </div>
      ) : null)}
    </div>
  );
}

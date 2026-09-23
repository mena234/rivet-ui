import type { ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface BreadcrumbItem { label: string; href?: string; current?: boolean }
export function Breadcrumbs({ items, ariaLabel = "Breadcrumb" }: { items: BreadcrumbItem[]; ariaLabel?: string }) {
  return <nav className="rv-breadcrumbs" aria-label={ariaLabel}><ol>{items.map((item, index) => <li key={`${item.label}-${index}`}>{index > 0 ? <span aria-hidden="true">/</span> : null}{item.href && !item.current ? <a href={item.href}>{item.label}</a> : <span aria-current={item.current ? "page" : undefined}>{item.label}</span>}</li>)}</ol></nav>;
}

export interface PaginationProps { page: number; pageCount: number; onPageChange: (page: number) => void; siblingCount?: number }
export function Pagination({ page, pageCount, onPageChange, siblingCount = 1 }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter((item) => item === 1 || item === pageCount || Math.abs(item - page) <= siblingCount);
  const display: Array<number | "ellipsis"> = [];
  pages.forEach((item, index) => { if (index > 0 && item - pages[index - 1] > 1) display.push("ellipsis"); display.push(item); });
  return <nav className="rv-pagination" aria-label="Pagination">
    <Button size="icon" variant="quiet" aria-label="Previous page" disabled={page <= 1} onClick={() => onPageChange(page - 1)}><ChevronLeft aria-hidden="true" /></Button>
    <div>{display.map((item, index) => item === "ellipsis" ? <span className="rv-pagination__ellipsis" key={`ellipsis-${index}`} aria-hidden="true">…</span> : <button type="button" key={item} aria-label={`Page ${item}`} aria-current={item === page ? "page" : undefined} onClick={() => onPageChange(item)}>{item}</button>)}</div>
    <Button size="icon" variant="quiet" aria-label="Next page" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}><ChevronRight aria-hidden="true" /></Button>
  </nav>;
}

export interface StepItem { label: string; description?: string; status?: "complete" | "current" | "upcoming"; icon?: ReactNode }
export function Stepper({ steps, orientation = "horizontal" }: { steps: StepItem[]; orientation?: "horizontal" | "vertical" }) {
  return <ol className="rv-stepper" data-orientation={orientation}>{steps.map((step, index) => <li key={step.label} data-status={step.status ?? "upcoming"} aria-current={step.status === "current" ? "step" : undefined}>
    <span className="rv-stepper__mark">{step.status === "complete" ? <Check aria-hidden="true" /> : step.icon ?? index + 1}</span>
    <span><strong>{step.label}</strong>{step.description ? <small>{step.description}</small> : null}</span>
  </li>)}</ol>;
}

"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface DialogProps { open: boolean; onOpenChange: (open: boolean) => void; title: string; description?: string; children: ReactNode; footer?: ReactNode; size?: "sm" | "md" | "lg" }
export function Dialog({ open, onOpenChange, title, description, children, footer, size = "md" }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useEffect(() => { const dialog = ref.current; if (!dialog) return; if (open && !dialog.open) dialog.showModal(); if (!open && dialog.open) dialog.close(); }, [open]);
  return <dialog className="rv-dialog" data-size={size} ref={ref} aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} onClose={() => onOpenChange(false)} onCancel={(event) => { event.preventDefault(); onOpenChange(false); }} onClick={(event) => { if (event.target === event.currentTarget) onOpenChange(false); }}>
    <section className="rv-dialog__surface">
      <header><div><h2 id={titleId}>{title}</h2>{description ? <p id={descriptionId}>{description}</p> : null}</div><Button size="icon" variant="quiet" aria-label="Close dialog" onClick={() => onOpenChange(false)}><X aria-hidden="true" /></Button></header>
      <div className="rv-dialog__body">{children}</div>{footer ? <footer>{footer}</footer> : null}
    </section>
  </dialog>;
}

export function Tooltip({ content, children, side = "top" }: { content: ReactNode; children: ReactNode; side?: "top" | "right" | "bottom" | "left" }) {
  const id = useId();
  return <span className="rv-tooltip" data-side={side}><span aria-describedby={id}>{children}</span><span className="rv-tooltip__bubble" role="tooltip" id={id}>{content}</span></span>;
}

export interface DropdownItem { value: string; label: string; description?: string; destructive?: boolean; disabled?: boolean }
export interface DropdownMenuProps { label: string; items: DropdownItem[]; onSelect?: (value: string) => void; align?: "start" | "end" }
export function DropdownMenu({ label, items, onSelect, align = "start" }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!rootRef.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", close); document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", close); document.removeEventListener("keydown", escape); };
  }, [open]);
  return <div className="rv-dropdown" data-align={align} ref={rootRef}>
    <Button aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((value) => !value)}>{label}<ChevronDown aria-hidden="true" /></Button>
    {open ? <div className="rv-dropdown__menu" role="menu">{items.map((item) => <button type="button" role="menuitem" key={item.value} data-destructive={item.destructive || undefined} disabled={item.disabled} onClick={() => { onSelect?.(item.value); setOpen(false); }}><span><strong>{item.label}</strong>{item.description ? <small>{item.description}</small> : null}</span>{item.value === "active" ? <Check aria-hidden="true" /> : null}</button>)}</div> : null}
  </div>;
}

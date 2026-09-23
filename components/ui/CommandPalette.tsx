"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import { ArrowRight, Search } from "lucide-react";

export interface CommandItem {
  id: string;
  label: string;
  group: string;
  hint?: string;
  icon: ComponentType<{ size?: number | string; "aria-hidden"?: boolean }>;
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
}

export function CommandPalette({ open, onOpenChange, items }: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return items;
    return items.filter((item) => `${item.group} ${item.label}`.toLocaleLowerCase().includes(normalized));
  }, [items, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  function runItem(index: number) {
    const item = filtered[index];
    if (!item) return;
    item.onSelect();
    onOpenChange(false);
  }

  return (
    <dialog
      className="rv-command"
      ref={dialogRef}
      aria-label="Command palette"
      onClose={() => onOpenChange(false)}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false);
      }}
    >
      <div className="rv-command__surface">
        <label className="rv-command__search">
          <Search size={18} aria-hidden="true" />
          <span className="rv-sr-only">Search commands</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown") {
                event.preventDefault();
                setActiveIndex((index) => (index + 1) % Math.max(filtered.length, 1));
              }
              if (event.key === "ArrowUp") {
                event.preventDefault();
                setActiveIndex((index) => (index - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
              }
              if (event.key === "Enter") {
                event.preventDefault();
                runItem(activeIndex);
              }
            }}
            placeholder="Search components and actions"
            autoComplete="off"
          />
          <kbd>ESC</kbd>
        </label>
        <div className="rv-command__results" role="listbox" aria-label="Command results">
          {filtered.length ? (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  role="option"
                  aria-selected={activeIndex === index}
                  className="rv-command__item"
                  key={item.id}
                  onPointerMove={() => setActiveIndex(index)}
                  onClick={() => runItem(index)}
                >
                  <span className="rv-command__item-icon"><Icon size={17} aria-hidden={true} /></span>
                  <span>
                    <strong>{item.label}</strong>
                    <small>{item.group}</small>
                  </span>
                  {item.hint ? <kbd>{item.hint}</kbd> : <ArrowRight size={15} aria-hidden="true" />}
                </button>
              );
            })
          ) : (
            <div className="rv-command__empty">No commands match “{query}”. Try “table” or “drawer”.</div>
          )}
        </div>
        <footer className="rv-command__footer">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> open</span>
          <span><kbd>esc</kbd> close</span>
        </footer>
      </div>
    </dialog>
  );
}

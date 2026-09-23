"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface AvatarProps { name: string; src?: string; size?: "sm" | "md" | "lg"; status?: "online" | "away" | "offline"; className?: string }
export function Avatar({ name, src, size = "md", status, className }: AvatarProps) {
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  return (
    <span className={cn("rv-person-avatar", className)} data-size={size} aria-label={name} title={name}>
      {src ? (
        // A design-system primitive cannot assume its consumer uses Next Image.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" />
      ) : <span aria-hidden="true">{initials}</span>}
      {status ? <i data-status={status} aria-label={status} /> : null}
    </span>
  );
}

export interface AvatarGroupProps { people: AvatarProps[]; max?: number }
export function AvatarGroup({ people, max = 4 }: AvatarGroupProps) {
  const visible = people.slice(0, max);
  const remaining = people.length - visible.length;
  return (
    <div className="rv-person-group" aria-label={`${people.length} people`}>
      {visible.map((person) => <Avatar {...person} key={person.name} size="sm" />)}
      {remaining > 0 ? <span className="rv-person-group__more" aria-label={`${remaining} more people`}>+{remaining}</span> : null}
    </div>
  );
}

export interface AccordionItem { value: string; title: string; content: ReactNode; disabled?: boolean }
export interface AccordionProps { items: AccordionItem[]; defaultValue?: string[]; allowMultiple?: boolean; onValueChange?: (values: string[]) => void }
export function Accordion({ items, defaultValue = [], allowMultiple = false, onValueChange }: AccordionProps) {
  const [openValues, setOpenValues] = useState(defaultValue);
  function toggle(value: string) {
    const isOpen = openValues.includes(value);
    const next = isOpen ? openValues.filter((item) => item !== value) : allowMultiple ? [...openValues, value] : [value];
    setOpenValues(next);
    onValueChange?.(next);
  }
  return (
    <div className="rv-accordion">
      {items.map((item) => {
        const open = openValues.includes(item.value);
        const id = `accordion-${item.value}`;
        return <section className="rv-accordion__item" key={item.value} data-open={open || undefined}>
          <h3><button type="button" disabled={item.disabled} aria-expanded={open} aria-controls={`${id}-panel`} onClick={() => toggle(item.value)}><span>{item.title}</span><ChevronDown aria-hidden="true" /></button></h3>
          <div id={`${id}-panel`} className="rv-accordion__panel" hidden={!open}>{item.content}</div>
        </section>;
      })}
    </div>
  );
}

export interface SegmentedOption { value: string; label: string; icon?: ReactNode; disabled?: boolean }
export interface SegmentedControlProps { label: string; options: SegmentedOption[]; value?: string; defaultValue?: string; onValueChange?: (value: string) => void }
export function SegmentedControl({ label, options, value, defaultValue, onValueChange }: SegmentedControlProps) {
  const generatedName = useId();
  const [internalValue, setInternalValue] = useState(defaultValue ?? options[0]?.value ?? "");
  const selected = value ?? internalValue;
  return (
    <fieldset className="rv-segmented"><legend className="rv-sr-only">{label}</legend>
      {options.map((option) => <label key={option.value} data-selected={selected === option.value || undefined}>
        <input className="rv-sr-only" type="radio" name={generatedName} value={option.value} checked={selected === option.value} disabled={option.disabled} onChange={() => { if (value === undefined) setInternalValue(option.value); onValueChange?.(option.value); }} />
        {option.icon}<span>{option.label}</span>
      </label>)}
    </fieldset>
  );
}

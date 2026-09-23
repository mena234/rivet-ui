"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface FilterValue {
  query: string;
  status: string;
  owner: string;
}

export interface FilterBarProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  resultCount?: number;
  onOpenAdvanced?: () => void;
}

export function FilterBar({ value, onChange, resultCount, onOpenAdvanced }: FilterBarProps) {
  const hasFilters = Boolean(value.query || value.status !== "all" || value.owner !== "all");
  const set = (patch: Partial<FilterValue>) => onChange({ ...value, ...patch });

  return (
    <section className="rv-filter-bar" aria-label="Filter projects">
      <label className="rv-filter-bar__search">
        <span>Search workspace</span>
        <span className="rv-input-shell">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={value.query}
            onChange={(event) => set({ query: event.target.value })}
            placeholder="Project, owner, or label"
          />
          {value.query ? (
            <button type="button" aria-label="Clear search" onClick={() => set({ query: "" })}>
              <X size={15} aria-hidden="true" />
            </button>
          ) : <span className="rv-input-shell__slot" />}
        </span>
      </label>
      <label className="rv-filter-field">
        <span>Status</span>
        <select value={value.status} onChange={(event) => set({ status: event.target.value })}>
          <option value="all">All statuses</option>
          <option value="on-track">On track</option>
          <option value="at-risk">At risk</option>
          <option value="blocked">Blocked</option>
        </select>
      </label>
      <label className="rv-filter-field">
        <span>Owner</span>
        <select value={value.owner} onChange={(event) => set({ owner: event.target.value })}>
          <option value="all">All owners</option>
          <option value="elena">Elena Ruiz</option>
          <option value="malik">Malik Ross</option>
          <option value="mina">Mina Park</option>
        </select>
      </label>
      <div className="rv-filter-bar__actions">
        <Button variant="secondary" leadingIcon={<SlidersHorizontal aria-hidden="true" />} onClick={onOpenAdvanced}>
          More filters
        </Button>
        {hasFilters ? (
          <Button variant="quiet" onClick={() => onChange({ query: "", status: "all", owner: "all" })}>
            Reset
          </Button>
        ) : null}
        {resultCount !== undefined ? <span className="rv-filter-bar__count" aria-live="polite">{resultCount} results</span> : null}
      </div>
    </section>
  );
}

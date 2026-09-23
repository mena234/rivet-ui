"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface TableColumn<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortValue?: (row: T) => string | number;
  align?: "start" | "end";
  mobilePriority?: boolean;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: TableColumn<T>[];
  getRowId: (row: T) => string;
  ariaLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowOpen?: (row: T) => void;
}

export function DataTable<T>({
  rows,
  columns,
  getRowId,
  ariaLabel = "Data table",
  emptyTitle = "No items found",
  emptyDescription = "Change the active filters to see more results.",
  onRowOpen,
}: DataTableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<{ id: string; direction: "asc" | "desc" } | null>(null);
  const selectAllRef = useRef<HTMLInputElement>(null);

  const sortedRows = useMemo(() => {
    if (!sort) return rows;
    const column = columns.find((item) => item.id === sort.id);
    if (!column?.sortValue) return rows;
    return [...rows].sort((a, b) => {
      const aValue = column.sortValue?.(a) ?? "";
      const bValue = column.sortValue?.(b) ?? "";
      const result = typeof aValue === "number" && typeof bValue === "number"
        ? aValue - bValue
        : String(aValue).localeCompare(String(bValue));
      return sort.direction === "asc" ? result : -result;
    });
  }, [columns, rows, sort]);

  const allSelected = rows.length > 0 && rows.every((row) => selected.has(getRowId(row)));
  const partiallySelected = selected.size > 0 && !allSelected;

  useEffect(() => {
    if (selectAllRef.current) selectAllRef.current.indeterminate = partiallySelected;
  }, [partiallySelected]);

  function toggleSort(column: TableColumn<T>) {
    if (!column.sortValue) return;
    setSort((current) => current?.id === column.id
      ? { id: column.id, direction: current.direction === "asc" ? "desc" : "asc" }
      : { id: column.id, direction: "asc" });
  }

  function toggleRow(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  if (!rows.length) {
    return (
      <div className="rv-empty-state">
        <div className="rv-empty-state__mark" aria-hidden="true">0</div>
        <h3>{emptyTitle}</h3>
        <p>{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="rv-data-table">
      <div className="rv-data-table__bulk" aria-live="polite">
        {selected.size ? `${selected.size} selected` : `${rows.length} items`}
      </div>
      <div className="rv-data-table__desktop">
        <table aria-label={ariaLabel}>
          <thead>
            <tr>
              <th className="rv-data-table__check">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  checked={allSelected}
                  aria-label="Select all rows"
                  onChange={() => setSelected(allSelected ? new Set() : new Set(rows.map(getRowId)))}
                />
              </th>
              {columns.map((column) => {
                const activeSort = sort?.id === column.id;
                const SortIcon = activeSort ? (sort.direction === "asc" ? ArrowUp : ArrowDown) : ArrowUpDown;
                return (
                  <th key={column.id} data-align={column.align ?? "start"} aria-sort={activeSort ? (sort.direction === "asc" ? "ascending" : "descending") : undefined}>
                    {column.sortValue ? (
                      <button type="button" onClick={() => toggleSort(column)}>
                        {column.header}<SortIcon size={14} aria-hidden="true" />
                      </button>
                    ) : column.header}
                  </th>
                );
              })}
              <th><span className="rv-sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => {
              const id = getRowId(row);
              return (
                <tr key={id} data-selected={selected.has(id) || undefined}>
                  <td className="rv-data-table__check">
                    <input type="checkbox" checked={selected.has(id)} aria-label={`Select ${id}`} onChange={() => toggleRow(id)} />
                  </td>
                  {columns.map((column) => <td key={column.id} data-align={column.align ?? "start"}>{column.accessor(row)}</td>)}
                  <td className="rv-data-table__actions">
                    <Button variant="quiet" size="icon" aria-label={`Open actions for ${id}`} onClick={() => onRowOpen?.(row)}>
                      <MoreHorizontal aria-hidden="true" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="rv-data-table__mobile" aria-label={`${ariaLabel}, compact view`}>
        {sortedRows.map((row) => {
          const id = getRowId(row);
          return (
            <article key={id} className="rv-table-card">
              <div className="rv-table-card__top">
                <input type="checkbox" checked={selected.has(id)} aria-label={`Select ${id}`} onChange={() => toggleRow(id)} />
                <Button variant="quiet" size="icon" aria-label={`Open actions for ${id}`} onClick={() => onRowOpen?.(row)}>
                  <MoreHorizontal aria-hidden="true" />
                </Button>
              </div>
              <dl>
                {columns.map((column) => (
                  <div key={column.id} data-priority={column.mobilePriority || undefined}>
                    <dt>{column.header}</dt>
                    <dd>{column.accessor(row)}</dd>
                  </div>
                ))}
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}

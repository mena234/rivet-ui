import type { ComponentType } from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

export interface KpiItem {
  label: string;
  value: string;
  change?: string;
  direction?: "up" | "down" | "flat";
  context?: string;
  icon: ComponentType<{ size?: number | string; "aria-hidden"?: boolean }>;
}

export interface KpiStripProps {
  items: KpiItem[];
  ariaLabel?: string;
}

export function KpiStrip({ items, ariaLabel = "Key metrics" }: KpiStripProps) {
  return (
    <section className="rv-kpi-strip" aria-label={ariaLabel}>
      {items.map((item) => {
        const Icon = item.icon;
        const DirectionIcon = item.direction === "up" ? ArrowUpRight : item.direction === "down" ? ArrowDownRight : Minus;
        return (
          <article className="rv-kpi" key={item.label}>
            <div className="rv-kpi__heading">
              <span>{item.label}</span>
              <Icon size={17} aria-hidden={true} />
            </div>
            <div className="rv-kpi__value">{item.value}</div>
            {item.change ? (
              <div className="rv-kpi__change" data-direction={item.direction ?? "flat"}>
                <DirectionIcon size={14} aria-hidden="true" />
                <span>{item.change}</span>
                {item.context ? <small>{item.context}</small> : null}
              </div>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}

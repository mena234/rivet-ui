"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { FilterBar, type FilterBarProps, type FilterValue } from "@/components/ui/FilterBar";
import { Tabs } from "@/components/ui/Tabs";

const meta = {
  title: "Patterns/Filters & Tabs",
  component: FilterBar,
  args: {
    onChange: fn(),
    onOpenAdvanced: fn(),
    resultCount: 6,
    value: { query: "", status: "all", owner: "all" },
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof FilterBar>;
export default meta;
type Story = StoryObj<typeof meta>;

function FilterExample({ onChange, onOpenAdvanced }: Pick<FilterBarProps, "onChange" | "onOpenAdvanced">) {
  const [filters, setFilters] = useState<FilterValue>({ query: "", status: "all", owner: "all" });
  const changeFilters = (nextFilters: FilterValue) => {
    setFilters(nextFilters);
    onChange(nextFilters);
  };
  return <FilterBar value={filters} onChange={changeFilters} onOpenAdvanced={onOpenAdvanced} resultCount={6} />;
}

const onTabChange = fn().mockName("onValueChange");

export const FilterBarStory: Story = {
  name: "Filter bar",
  render: (args) => <main className="rv-story-canvas"><FilterExample onChange={args.onChange} onOpenAdvanced={args.onOpenAdvanced} /></main>,
};

export const TabbedNavigation: Story = {
  render: () => (
    <main className="rv-story-canvas">
      <Tabs
        onValueChange={onTabChange}
        items={[
          { value: "overview", label: "Overview", content: <div className="rv-story-placeholder">Overview panel</div> },
          { value: "components", label: "Components", count: 12, content: <div className="rv-story-placeholder">Component panel</div> },
          { value: "activity", label: "Activity", count: 4, content: <div className="rv-story-placeholder">Activity panel</div> },
        ]}
      />
    </main>
  ),
};

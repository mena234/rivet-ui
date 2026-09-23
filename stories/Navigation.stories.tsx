"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Breadcrumbs, Pagination, Stepper } from "@/components/ui/Navigation";

const onPageChange = fn().mockName("onPageChange");

const meta = {
  title: "Components/Navigation",
  component: Breadcrumbs,
  args: { items: [{ label: "Workspace", href: "#" }, { label: "Projects", href: "#" }, { label: "Northstar", current: true }] },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const BreadcrumbsStory: Story = { name: "Breadcrumbs", render: (args) => <main className="rv-story-canvas"><Breadcrumbs {...args} /></main> };

function PaginationExample() {
  const [page, setPage] = useState(4);
  return <Pagination page={page} pageCount={12} onPageChange={(next) => { setPage(next); onPageChange(next); }} />;
}
export const PaginationStory: Story = { name: "Pagination", render: () => <main className="rv-story-canvas"><PaginationExample /></main> };

export const StepperStory: Story = {
  name: "Stepper",
  render: () => <main className="rv-story-canvas"><header className="rv-story-title"><h1>Progressive navigation</h1><p>Use a stepper for finite workflows where order and completion matter.</p></header><div className="rv-story-nav-stack"><Stepper steps={[{ label: "Workspace", description: "Basic details", status: "complete" }, { label: "Members", description: "Invite collaborators", status: "current" }, { label: "Integrations", description: "Connect tools" }, { label: "Review", description: "Confirm setup" }]} /><Stepper orientation="vertical" steps={[{ label: "Request received", status: "complete" }, { label: "Security review", status: "complete" }, { label: "Owner approval", status: "current" }, { label: "Provision access" }]} /></div></main>,
};

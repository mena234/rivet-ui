"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Info, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Dialog, DropdownMenu, Tooltip, type DialogProps } from "@/components/ui/Overlays";

const onOpenChange = fn().mockName("onOpenChange");
const onConfirm = fn().mockName("onConfirm");
const onSelect = fn().mockName("onSelect");

const meta = {
  title: "Components/Overlays",
  component: Dialog,
  args: { open: false, onOpenChange, title: "Archive project", children: null },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

function DialogExample({ onOpenChange: logOpenChange }: Pick<DialogProps, "onOpenChange">) {
  const [open, setOpen] = useState(false);
  const changeOpen = (next: boolean) => { setOpen(next); logOpenChange(next); };
  return <><Button variant="danger" onClick={() => changeOpen(true)}>Archive project</Button><Dialog open={open} onOpenChange={changeOpen} title="Archive project?" description="The project will become read-only for every member." footer={<><Button variant="quiet" onClick={() => changeOpen(false)}>Cancel</Button><Button variant="danger" onClick={() => { onConfirm(); changeOpen(false); }}>Archive</Button></>}><p>You can restore this project from workspace settings for 30 days.</p></Dialog></>;
}

export const DialogStory: Story = { name: "Dialog", render: (args) => <main className="rv-story-canvas rv-story-overlay-trigger"><DialogExample onOpenChange={args.onOpenChange} /></main> };

export const TooltipStory: Story = {
  name: "Tooltip",
  render: () => <main className="rv-story-canvas rv-story-overlay-trigger"><Tooltip content="More information about workspace limits"><Button size="icon" variant="quiet" aria-label="Workspace limit information"><Info aria-hidden="true" /></Button></Tooltip><Tooltip side="bottom" content="Opens project actions"><Button size="icon" aria-label="Project actions"><MoreHorizontal aria-hidden="true" /></Button></Tooltip></main>,
};

export const DropdownStory: Story = {
  name: "Dropdown menu",
  render: () => <main className="rv-story-canvas rv-story-overlay-trigger"><DropdownMenu label="Project actions" onSelect={onSelect} items={[{ value: "active", label: "Active", description: "Currently selected" }, { value: "duplicate", label: "Duplicate project" }, { value: "move", label: "Move to workspace" }, { value: "archive", label: "Archive", destructive: true }]} /></main>,
};

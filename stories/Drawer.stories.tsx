"use client";

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "@/components/ui/Button";
import { Drawer, type DrawerProps } from "@/components/ui/Drawer";

const meta = {
  title: "Components/Slide-over Drawer",
  component: Drawer,
  args: {
    children: null,
    onOpenChange: fn(),
    open: false,
    title: "Edit project",
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Drawer>;
export default meta;
type Story = StoryObj<typeof meta>;

function DrawerExample({ onOpenChange }: Pick<DrawerProps, "onOpenChange">) {
  const [open, setOpen] = useState(false);
  const changeOpen = (nextOpen: boolean) => {
    setOpen(nextOpen);
    onOpenChange(nextOpen);
  };
  return (
    <main className="rv-story-canvas rv-story-drawer-trigger">
      <Button variant="primary" onClick={() => changeOpen(true)}>Open project drawer</Button>
      <Drawer open={open} onOpenChange={changeOpen} title="Edit project" description="Change ownership, status, and review notes." footer={<><Button variant="quiet" onClick={() => changeOpen(false)}>Cancel</Button><Button variant="primary" onClick={() => changeOpen(false)}>Save changes</Button></>}>
        <form className="rv-form-stack">
          <label className="rv-field"><span>Project name</span><input defaultValue="Parcel Notes" /></label>
          <label className="rv-field"><span>Status</span><select defaultValue="on-track"><option value="on-track">On track</option><option value="at-risk">At risk</option><option value="blocked">Blocked</option></select></label>
          <label className="rv-field"><span>Review notes</span><textarea placeholder="Describe the next decision." /></label>
        </form>
      </Drawer>
    </main>
  );
}

export const Interactive: Story = { render: (args) => <DrawerExample onOpenChange={args.onOpenChange} /> };

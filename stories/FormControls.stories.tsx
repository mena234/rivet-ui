"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { AtSign } from "lucide-react";
import { Checkbox, RadioGroup, SelectField, Switch, TextAreaField, TextField } from "@/components/ui/FormControls";

const onTextChange = fn().mockName("onTextChange");
const onSelectChange = fn().mockName("onSelectChange");
const onCheckboxChange = fn().mockName("onCheckboxChange");
const onRadioChange = fn().mockName("onValueChange");
const onSwitchChange = fn().mockName("onCheckedChange");

const meta = {
  title: "Components/Form Controls",
  component: TextField,
  args: { label: "Email address", placeholder: "name@company.com", onChange: onTextChange },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextFields: Story = {
  render: (args) => <main className="rv-story-canvas"><header className="rv-story-title"><h1>Text fields</h1><p>Labels, supporting text, validation, icons, and disabled states share one accessible field frame.</p></header><div className="rv-story-form-grid">
    <TextField {...args} leadingIcon={<AtSign aria-hidden="true" />} description="We use this for account notifications." />
    <TextField label="Project name" defaultValue="Northstar launch" onChange={onTextChange} />
    <TextField label="Workspace slug" defaultValue="northstar launch" error="Use lowercase letters and hyphens only." onChange={onTextChange} />
    <TextField label="API key" value="••••••••••••••••" disabled readOnly />
    <TextAreaField label="Project brief" placeholder="Describe the outcome and audience." description="Maximum 500 characters." maxLength={500} onChange={onTextChange} />
    <SelectField label="Region" defaultValue="eu" options={[{ value: "us", label: "United States" }, { value: "eu", label: "Europe" }, { value: "apac", label: "Asia Pacific" }]} onChange={onSelectChange} />
  </div></main>,
};

export const SelectionControls: Story = {
  render: () => <main className="rv-story-canvas"><header className="rv-story-title"><h1>Selection controls</h1><p>Native semantics, generous touch targets, and explicit callback events.</p></header><div className="rv-story-grid">
    <section className="rv-story-demo-card"><Checkbox label="Weekly summary" description="Receive a digest every Monday." defaultChecked onChange={onCheckboxChange} /><Checkbox label="Product updates" description="Occasional release announcements." onChange={onCheckboxChange} /><Checkbox label="Legacy reports" description="Unavailable on this plan." disabled onChange={onCheckboxChange} /></section>
    <section className="rv-story-demo-card"><RadioGroup label="Visibility" name="visibility" defaultValue="team" onValueChange={onRadioChange} options={[{ value: "private", label: "Private", description: "Only invited members" }, { value: "team", label: "Workspace", description: "Everyone in this workspace" }, { value: "public", label: "Public", description: "Anyone with the link" }]} /></section>
    <section className="rv-story-demo-card"><Switch label="Auto-save" description="Save changes as you work." defaultChecked onCheckedChange={onSwitchChange} /><Switch label="Comment notifications" description="Notify you when someone replies." onCheckedChange={onSwitchChange} /><Switch label="Audit logging" description="Available on Enterprise." disabled onCheckedChange={onSwitchChange} /></section>
  </div></main>,
};

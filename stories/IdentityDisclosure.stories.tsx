import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Grid2X2, List } from "lucide-react";
import { Accordion, Avatar, AvatarGroup, SegmentedControl } from "@/components/ui/IdentityDisclosure";

const onAccordionChange = fn().mockName("onValueChange");
const onSegmentChange = fn().mockName("onValueChange");

const meta = {
  title: "Components/Identity & Disclosure",
  component: Avatar,
  args: { name: "Mina Park", status: "online" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

const people = [{ name: "Mina Park", status: "online" as const }, { name: "Elena Ruiz", status: "away" as const }, { name: "Malik Ross", status: "offline" as const }, { name: "Jules Lee", status: "online" as const }, { name: "Sam Chen", status: "online" as const }];

export const Avatars: Story = {
  render: (args) => <main className="rv-story-canvas"><header className="rv-story-title"><h1>Avatars</h1><p>Initial fallbacks, presence, size variants, and compact groups.</p></header><div className="rv-specimen-row"><Avatar {...args} size="sm" /><Avatar name="Elena Ruiz" status="away" /><Avatar name="Malik Ross" size="lg" status="offline" /><AvatarGroup people={people} max={4} /></div></main>,
};

export const AccordionStory: Story = {
  name: "Accordion",
  render: () => <main className="rv-story-canvas"><section className="rv-story-demo-card rv-story-demo-card--wide"><Accordion defaultValue={["access"]} onValueChange={onAccordionChange} items={[{ value: "access", title: "Who can access this workspace?", content: "Workspace administrators can invite members and assign granular roles from Settings." }, { value: "billing", title: "How does usage billing work?", content: "Usage is calculated monthly and appears alongside your plan subscription." }, { value: "export", title: "Can I export my data?", content: "Yes. Administrators can export projects, members, and audit events at any time." }]} /></section></main>,
};

export const Segmented: Story = {
  render: () => <main className="rv-story-canvas"><SegmentedControl label="View layout" defaultValue="grid" onValueChange={onSegmentChange} options={[{ value: "grid", label: "Grid", icon: <Grid2X2 aria-hidden="true" /> }, { value: "list", label: "List", icon: <List aria-hidden="true" /> }]} /></main>,
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { CircleAlert, Clock3, FolderKanban, Gauge } from "lucide-react";
import { ProjectCard } from "@/components/ui/Card";
import { KpiStrip, type KpiItem } from "@/components/ui/KpiStrip";

const metrics: KpiItem[] = [
  { label: "Active projects", value: "24", change: "3 added", direction: "up", context: "this month", icon: FolderKanban },
  { label: "Review queue", value: "8", change: "2 cleared", direction: "down", context: "since Monday", icon: Clock3 },
  { label: "Delivery rate", value: "91%", change: "4 points", direction: "up", context: "vs. last cycle", icon: Gauge },
  { label: "Open risks", value: "3", change: "No change", direction: "flat", context: "this week", icon: CircleAlert },
];

const meta = {
  title: "Patterns/Metrics & Cards",
  component: ProjectCard,
  args: {
    description: "Editorial workflow and release checklist",
    due: "Due Aug 18",
    members: ["Elena Ruiz", "Mina Park", "Sam Tan"],
    name: "Parcel Notes",
    onOpen: fn(),
    progress: 84,
    status: "On track",
  },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof ProjectCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const KpiStripStory: Story = {
  name: "KPI strip",
  render: () => <main className="rv-story-canvas"><KpiStrip items={metrics} /></main>,
};

export const AsymmetricCardGrid: Story = {
  render: (args) => (
    <main className="rv-story-canvas">
      <div className="rv-card-grid">
        <ProjectCard span="wide" name="Parcel Notes" description="Editorial workflow and release checklist" status="On track" statusTone="success" progress={84} due="Due Aug 18" members={["Elena Ruiz", "Mina Park", "Sam Tan"]} onOpen={args.onOpen} />
        <ProjectCard name="Ridgeline Console" description="Infrastructure dashboard navigation" status="At risk" statusTone="warning" progress={62} due="Due Aug 21" members={["Malik Ross", "Kira Bose"]} onOpen={args.onOpen} />
        <ProjectCard name="Field Manual" description="Operations knowledge base refresh" status="On track" statusTone="success" progress={71} due="Due Aug 28" members={["Mina Park", "Elena Ruiz"]} onOpen={args.onOpen} />
      </div>
    </main>
  ),
};

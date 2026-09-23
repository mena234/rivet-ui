import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const meta = {
  title: "Components/Buttons & Badges",
  component: Button,
  args: { onClick: fn() },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EightStates: Story = {
  render: (args) => (
    <main className="rv-story-canvas">
      <header className="rv-story-title"><h1>Button states</h1><p>Every interactive control covers default, hover, focus, active, disabled, loading, error, and success.</p></header>
      <div className="rv-story-states">
        <span>Default</span><div><Button variant="primary" onClick={args.onClick}>Create project</Button><Button onClick={args.onClick}>Open settings</Button></div>
        <span>Hover</span><div className="rv-story-state--hover"><Button variant="primary" onClick={args.onClick}>Create project</Button></div>
        <span>Focus</span><div className="rv-story-state--focus"><Button variant="primary" onClick={args.onClick}>Create project</Button></div>
        <span>Active</span><div className="rv-story-state--active"><Button variant="primary" onClick={args.onClick}>Create project</Button></div>
        <span>Disabled</span><div><Button disabled>Unavailable</Button></div>
        <span>Loading</span><div><Button state="loading" onClick={args.onClick}>Saving changes</Button></div>
        <span>Error</span><div><Button state="error" onClick={args.onClick}>Try again</Button></div>
        <span>Success</span><div><Button state="success" onClick={args.onClick}>Changes saved</Button></div>
      </div>
    </main>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <main className="rv-story-canvas">
      <header className="rv-story-title"><h1>Status badges</h1><p>Text and a status dot accompany every colour treatment.</p></header>
      <div className="rv-specimen-row">
        <Badge dot>Draft</Badge><Badge tone="info" dot>In review</Badge><Badge tone="success" dot>Ready</Badge><Badge tone="warning" dot>Needs review</Badge><Badge tone="error" dot>Blocked</Badge>
      </div>
    </main>
  ),
};

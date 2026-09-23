import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { AppShell } from "@/components/ui/AppShell";

const meta = { title: "Layout/Page Shell", component: AppShell, parameters: { layout: "fullscreen" } } satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: "Workspace overview", subtitle: "Navigation, command search, content, and responsive shell.", children: null, onCreate: fn() },
  render: (args) => <AppShell {...args}><div className="rv-story-placeholder">Page content</div></AppShell>,
};

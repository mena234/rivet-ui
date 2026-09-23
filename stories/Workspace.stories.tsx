import type { Meta, StoryObj } from "@storybook/react-vite";
import { ShowcaseDashboard } from "@/components/showcase/ShowcaseDashboard";

const meta = { title: "Pages/Workspace", component: ShowcaseDashboard, parameters: { layout: "fullscreen" } } satisfies Meta<typeof ShowcaseDashboard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Composed: Story = { render: () => <ShowcaseDashboard /> };

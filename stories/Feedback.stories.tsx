import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Button } from "@/components/ui/Button";
import { Alert, EmptyState, ProgressBar, Skeleton, Spinner } from "@/components/ui/Feedback";

const onRetry = fn().mockName("onRetry");
const onCreate = fn().mockName("onCreate");

const meta = {
  title: "Components/Feedback & Loading",
  component: Alert,
  args: { title: "Workspace updated", tone: "success", children: "Your settings are now active for every member." },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Alerts: Story = {
  render: (args) => <main className="rv-story-canvas"><header className="rv-story-title"><h1>Alerts</h1><p>Four semantic tones for inline feedback and time-sensitive notices.</p></header><div className="rv-story-feedback-stack">
    <Alert {...args} />
    <Alert tone="info" title="New permissions available">Review the updated workspace roles before inviting new members.</Alert>
    <Alert tone="warning" title="Usage approaching limit" action={<Button size="sm" onClick={onRetry}>Review plan</Button>}>You have used 82% of this month&apos;s automation allowance.</Alert>
    <Alert tone="error" title="Connection interrupted" action={<Button size="sm" variant="danger" onClick={onRetry}>Retry</Button>}>We could not sync the latest changes.</Alert>
  </div></main>,
};

export const ProgressAndLoading: Story = {
  render: () => <main className="rv-story-canvas"><header className="rv-story-title"><h1>Progress and loading</h1><p>Determinate, indeterminate, compact, and content-shaped loading treatments.</p></header><div className="rv-story-grid">
    <section className="rv-story-demo-card rv-story-stack"><ProgressBar label="Workspace setup" value={68} showValue /><ProgressBar label="Importing records" /><ProgressBar label="Ready" value={100} showValue tone="success" size="sm" /><div className="rv-specimen-row"><Spinner size="sm" /><Spinner /><Spinner size="lg" /></div></section>
    <section className="rv-story-demo-card rv-story-loading-card"><div className="rv-story-loading-card__head"><Skeleton width={40} height={40} rounded /><div className="rv-story-stack" style={{ gap: "0.5rem", flex: 1 }}><Skeleton width="42%" /><Skeleton width="68%" height="0.7rem" /></div></div><Skeleton height="7rem" /><Skeleton width="78%" /><Skeleton width="55%" /></section>
  </div></main>,
};

export const Empty: Story = {
  render: () => <main className="rv-story-canvas"><section className="rv-story-demo-card"><EmptyState title="No saved views yet" description="Create a reusable view for the filters your team checks most often." actionLabel="Create saved view" onAction={onCreate} /></section></main>,
};

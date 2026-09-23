import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { DataTable, type TableColumn } from "@/components/ui/DataTable";
import { projects, type Project } from "@/lib/demo-data";

const tones: Record<Project["status"], BadgeTone> = { "On track": "success", "At risk": "warning", "Blocked": "error" };
const columns: TableColumn<Project>[] = [
  { id: "project", header: "Project", accessor: (row) => <span className="rv-table-project"><strong>{row.name}</strong><small>{row.id}</small></span>, sortValue: (row) => row.name, mobilePriority: true },
  { id: "owner", header: "Owner", accessor: (row) => row.owner, sortValue: (row) => row.owner },
  { id: "status", header: "Status", accessor: (row) => <Badge tone={tones[row.status]} dot>{row.status}</Badge>, sortValue: (row) => row.status },
  { id: "progress", header: "Progress", accessor: (row) => `${row.progress}%`, sortValue: (row) => row.progress, align: "end" },
  { id: "due", header: "Due", accessor: (row) => row.due.replace("Due ", ""), sortValue: (row) => row.dueSort, align: "end" },
];

const meta = { title: "Components/Data Table", component: DataTable<Project>, parameters: { layout: "fullscreen" } } satisfies Meta<typeof DataTable<Project>>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SortableAndSelectable: Story = {
  args: { rows: projects, columns, getRowId: (row) => row.id, onRowOpen: fn() },
  render: (args) => <main className="rv-story-canvas"><DataTable {...args} /></main>,
};

export const Empty: Story = {
  args: { rows: [], columns, getRowId: (row) => row.id, onRowOpen: fn() },
  render: (args) => <main className="rv-story-canvas"><DataTable {...args} /></main>,
};

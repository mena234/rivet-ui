"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FolderKanban,
  Gauge,
  Plus,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/ui/AppShell";
import { Badge, type BadgeTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, ProjectCard } from "@/components/ui/Card";
import { DataTable, type TableColumn } from "@/components/ui/DataTable";
import { Drawer } from "@/components/ui/Drawer";
import { FilterBar, type FilterValue } from "@/components/ui/FilterBar";
import { KpiStrip, type KpiItem } from "@/components/ui/KpiStrip";
import { Tabs } from "@/components/ui/Tabs";
import { projects, type Project } from "@/lib/demo-data";

const badgeTone: Record<Project["status"], BadgeTone> = {
  "On track": "success",
  "At risk": "warning",
  "Blocked": "error",
};

const kpis: KpiItem[] = [
  { label: "Active projects", value: "24", change: "3 added", direction: "up", context: "this month", icon: FolderKanban },
  { label: "Review queue", value: "8", change: "2 cleared", direction: "down", context: "since Monday", icon: Clock3 },
  { label: "Delivery rate", value: "91%", change: "4 points", direction: "up", context: "vs. last cycle", icon: Gauge },
  { label: "Open risks", value: "3", change: "No change", direction: "flat", context: "this week", icon: CircleAlert },
];

const columns: TableColumn<Project>[] = [
  {
    id: "project",
    header: "Project",
    accessor: (project) => (
      <span className="rv-table-project">
        <strong>{project.name}</strong>
        <small>{project.id}</small>
      </span>
    ),
    sortValue: (project) => project.name,
    mobilePriority: true,
  },
  {
    id: "owner",
    header: "Owner",
    accessor: (project) => (
      <span className="rv-table-owner"><span className="rv-avatar">{project.owner.split(" ").map((name) => name[0]).join("")}</span>{project.owner}</span>
    ),
    sortValue: (project) => project.owner,
  },
  {
    id: "status",
    header: "Status",
    accessor: (project) => <Badge tone={badgeTone[project.status]} dot>{project.status}</Badge>,
    sortValue: (project) => project.status,
  },
  {
    id: "progress",
    header: "Progress",
    accessor: (project) => <span className="rv-table-progress"><span>{project.progress}%</span><span className="rv-progress"><span style={{ transform: `scaleX(${project.progress / 100})` }} /></span></span>,
    sortValue: (project) => project.progress,
    align: "end",
  },
  {
    id: "due",
    header: "Due",
    accessor: (project) => project.due.replace("Due ", ""),
    sortValue: (project) => project.dueSort,
    align: "end",
  },
];

const activityItems = [
  { title: "Review completed", detail: "Mina approved the Field Manual navigation", time: "12 min", icon: CheckCircle2 },
  { title: "Risk raised", detail: "API mapping is waiting on a schema decision", time: "38 min", icon: CircleAlert },
  { title: "Team updated", detail: "Kira joined Ridgeline Console", time: "1 hr", icon: Users },
  { title: "Component published", detail: "Data table 0.4.0 is ready in Storybook", time: "3 hrs", icon: Boxes },
];

export function ShowcaseDashboard() {
  const [view, setView] = useState("overview");
  const [filters, setFilters] = useState<FilterValue>({ query: "", status: "all", owner: "all" });
  const [drawer, setDrawer] = useState<"closed" | "filters" | "create" | "details">("closed");
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0]);

  const filteredProjects = useMemo(() => {
    const query = filters.query.trim().toLocaleLowerCase();
    return projects.filter((project) => {
      const matchesQuery = !query || `${project.name} ${project.owner} ${project.id}`.toLocaleLowerCase().includes(query);
      const matchesStatus = filters.status === "all" || project.statusKey === filters.status;
      const matchesOwner = filters.owner === "all" || project.ownerKey === filters.owner;
      return matchesQuery && matchesStatus && matchesOwner;
    });
  }, [filters]);

  function openProject(project: Project) {
    setSelectedProject(project);
    setDrawer("details");
  }

  return (
    <AppShell
      title="Workspace overview"
      subtitle="A composed reference for navigation, filters, data, cards, and overlays."
      onCreate={() => setDrawer("create")}
    >
      <Tabs
        items={[
          { value: "overview", label: "Overview" },
          { value: "components", label: "Components", count: 12 },
          { value: "activity", label: "Activity", count: 4 },
        ]}
        value={view}
        onValueChange={setView}
        ariaLabel="Workspace views"
      />

      {view === "overview" ? (
        <div className="rv-view-stack">
          <KpiStrip items={kpis} />

          <section className="rv-section" aria-labelledby="project-grid-title">
            <header className="rv-section__head">
              <div><h2 id="project-grid-title">Current work</h2><p>Projects that changed during this review cycle.</p></div>
              <Button variant="quiet">View all projects <ArrowRight aria-hidden="true" /></Button>
            </header>
            <FilterBar value={filters} onChange={setFilters} resultCount={filteredProjects.length} onOpenAdvanced={() => setDrawer("filters")} />
            <div className="rv-card-grid">
              {filteredProjects.slice(0, 4).map((project, index) => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                  status={project.status}
                  statusTone={badgeTone[project.status]}
                  progress={project.progress}
                  due={project.due}
                  members={project.members}
                  span={index === 0 ? "wide" : "default"}
                  onOpen={() => openProject(project)}
                />
              ))}
            </div>
          </section>

          <section className="rv-section rv-spotlight" aria-labelledby="health-title">
            <div className="rv-spotlight__copy">
              <h2 id="health-title">Interface health is ready for review.</h2>
              <p>Six checks passed. Two need a human decision before the next component release.</p>
              <Button variant="secondary">Open QA report <ArrowRight aria-hidden="true" /></Button>
            </div>
            <div className="rv-spotlight__checks">
              {[
                ["Keyboard paths", "Passed"],
                ["Touch targets", "Passed"],
                ["Compact table", "Passed"],
                ["Copy review", "Needs review"],
              ].map(([label, state]) => (
                <div key={label}><span>{label}</span><Badge tone={state === "Passed" ? "success" : "warning"} dot>{state}</Badge></div>
              ))}
            </div>
          </section>

          <section className="rv-section" id="project-table" aria-labelledby="project-table-title">
            <header className="rv-section__head">
              <div><h2 id="project-table-title">Project register</h2><p>Sortable columns, row selection, mobile cards, and contextual actions.</p></div>
              <Button variant="secondary">Export CSV</Button>
            </header>
            <DataTable rows={filteredProjects} columns={columns} getRowId={(project) => project.id} onRowOpen={openProject} />
          </section>
        </div>
      ) : null}

      {view === "components" ? (
        <div className="rv-view-stack" id="button-states">
          <section className="rv-section">
            <header className="rv-section__head">
              <div><h2>Control states</h2><p>Primary actions, quiet actions, destructive intent, and async feedback.</p></div>
            </header>
            <Card title="Buttons" description="The same geometry across every state.">
              <div className="rv-specimen-row">
                <Button variant="primary">Create project</Button>
                <Button variant="secondary">Open settings</Button>
                <Button variant="quiet">View details</Button>
                <Button variant="danger">Remove access</Button>
                <Button state="loading">Saving changes</Button>
                <Button state="success">Changes saved</Button>
                <Button state="error">Try again</Button>
                <Button disabled>Unavailable</Button>
              </div>
            </Card>
            <Card title="Badges" description="Status is communicated with text and shape, not colour alone.">
              <div className="rv-specimen-row">
                <Badge dot>Draft</Badge>
                <Badge tone="info" dot>In review</Badge>
                <Badge tone="success" dot>Ready</Badge>
                <Badge tone="warning" dot>Needs review</Badge>
                <Badge tone="error" dot>Blocked</Badge>
              </div>
            </Card>
            <Card title="Overlays" description="The drawer uses native dialog semantics and closes with Escape.">
              <div className="rv-specimen-row">
                <Button variant="primary" onClick={() => setDrawer("create")} leadingIcon={<Plus aria-hidden="true" />}>Open drawer</Button>
                <Button variant="secondary" onClick={() => setDrawer("filters")}>Configure filters</Button>
              </div>
            </Card>
          </section>
        </div>
      ) : null}

      {view === "activity" ? (
        <div className="rv-view-stack">
          <section className="rv-section">
            <header className="rv-section__head"><div><h2>Recent activity</h2><p>Operational updates across the sample workspace.</p></div></header>
            <Card className="rv-activity-card">
              <ol className="rv-activity-list">
                {activityItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.title}>
                      <span className="rv-activity-list__icon"><Icon size={17} aria-hidden="true" /></span>
                      <span><strong>{item.title}</strong><small>{item.detail}</small></span>
                      <time>{item.time}</time>
                    </li>
                  );
                })}
              </ol>
            </Card>
          </section>
        </div>
      ) : null}

      <Drawer
        open={drawer !== "closed"}
        onOpenChange={(open) => { if (!open) setDrawer("closed"); }}
        title={drawer === "filters" ? "Advanced filters" : drawer === "create" ? "Create project" : selectedProject?.name ?? "Project details"}
        description={drawer === "filters" ? "Narrow the workspace without changing its saved view." : drawer === "create" ? "Add a project to the sample workspace." : selectedProject?.description}
        footer={
          <>
            <Button variant="quiet" onClick={() => setDrawer("closed")}>Cancel</Button>
            <Button variant="primary" onClick={() => setDrawer("closed")}>{drawer === "filters" ? "Apply filters" : drawer === "create" ? "Create project" : "Save changes"}</Button>
          </>
        }
      >
        {drawer === "filters" ? (
          <form className="rv-form-stack">
            <fieldset>
              <legend>Include work</legend>
              <label className="rv-check"><input type="checkbox" defaultChecked /> Updated this week</label>
              <label className="rv-check"><input type="checkbox" /> Missing an owner</label>
              <label className="rv-check"><input type="checkbox" /> Past due date</label>
            </fieldset>
            <label className="rv-field"><span>Minimum progress</span><input type="range" min="0" max="100" defaultValue="25" /><small>25% or more</small></label>
          </form>
        ) : drawer === "details" && selectedProject ? (
          <form className="rv-form-stack">
            <label className="rv-field"><span>Project name</span><input defaultValue={selectedProject.name} /></label>
            <label className="rv-field"><span>Owner</span><select defaultValue={selectedProject.ownerKey}><option value="elena">Elena Ruiz</option><option value="malik">Malik Ross</option><option value="mina">Mina Park</option></select></label>
            <label className="rv-field"><span>Status</span><select defaultValue={selectedProject.statusKey}><option value="on-track">On track</option><option value="at-risk">At risk</option><option value="blocked">Blocked</option></select></label>
            <label className="rv-field"><span>Summary</span><textarea defaultValue={selectedProject.description} /></label>
          </form>
        ) : (
          <form className="rv-form-stack">
            <label className="rv-field"><span>Project name</span><input placeholder="Quarterly field guide" /></label>
            <label className="rv-field"><span>Owner</span><select defaultValue="elena"><option value="elena">Elena Ruiz</option><option value="malik">Malik Ross</option><option value="mina">Mina Park</option></select></label>
            <label className="rv-field"><span>Target date</span><input type="date" defaultValue="2026-09-15" /></label>
            <label className="rv-field"><span>Summary</span><textarea placeholder="Describe the project outcome and review criteria." /></label>
          </form>
        )}
      </Drawer>
    </AppShell>
  );
}

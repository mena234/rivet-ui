"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  Bell,
  Blocks,
  BookOpen,
  Box,
  ChevronsUpDown,
  CircleHelp,
  Component,
  FileText,
  LayoutDashboard,
  Menu,
  Plus,
  Search,
  Settings,
  TableProperties,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CommandPalette, type CommandItem } from "@/components/ui/CommandPalette";
import { cn } from "@/lib/cn";

interface AppShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  activeNav?: string;
  onCreate?: () => void;
}

const primaryNav = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: Box },
  { id: "library", label: "Components", icon: Component },
  { id: "patterns", label: "Patterns", icon: Blocks },
  { id: "data", label: "Data", icon: TableProperties },
  { id: "team", label: "Team", icon: Users },
];

export function AppShell({ children, title, subtitle, activeNav = "overview", onCreate }: AppShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        setCommandOpen(true);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const commandItems = useMemo<CommandItem[]>(() => [
    { id: "button", label: "Button states", group: "Components", icon: Component, onSelect: () => { window.location.hash = "button-states"; } },
    { id: "table", label: "Data table", group: "Components", icon: TableProperties, onSelect: () => { window.location.hash = "project-table"; } },
    { id: "docs", label: "Open Storybook", group: "Documentation", icon: BookOpen, hint: "↗", onSelect: () => { window.open("http://localhost:6006", "_blank", "noopener,noreferrer"); } },
    { id: "notes", label: "Release notes", group: "Workspace", icon: FileText, onSelect: () => { window.location.hash = "release-notes"; } },
    { id: "settings", label: "Workspace settings", group: "Workspace", icon: Settings, onSelect: () => { window.location.hash = "settings"; } },
  ], []);

  const sidebar = (
    <>
      <div className="rv-shell__workspace">
        <span className="rv-shell__workspace-mark" aria-hidden="true">R</span>
        <span><strong>Rivet Studio</strong><small>General workspace</small></span>
        <ChevronsUpDown size={15} aria-hidden="true" />
      </div>
      <nav className="rv-shell__nav" aria-label="Workspace">
        <span className="rv-shell__nav-label">Workspace</span>
        {primaryNav.map((item) => {
          const Icon = item.icon;
          return (
            <a href={`#${item.id}`} key={item.id} aria-current={activeNav === item.id ? "page" : undefined} onClick={() => setMobileNavOpen(false)}>
              <Icon size={17} aria-hidden="true" />
              <span>{item.label}</span>
              {item.id === "projects" ? <small>24</small> : null}
            </a>
          );
        })}
      </nav>
      <nav className="rv-shell__nav rv-shell__nav--utility" aria-label="Support">
        <a href="#docs"><BookOpen size={17} aria-hidden="true" /><span>Documentation</span></a>
        <a href="#help"><CircleHelp size={17} aria-hidden="true" /><span>Help center</span></a>
        <a href="#settings"><Settings size={17} aria-hidden="true" /><span>Settings</span></a>
      </nav>
      <div className="rv-shell__profile">
        <span className="rv-avatar">ER</span>
        <span><strong>Elena Ruiz</strong><small>Product lead</small></span>
        <button type="button" aria-label="Open account menu"><ChevronsUpDown size={15} aria-hidden="true" /></button>
      </div>
    </>
  );

  return (
    <div className="rv-shell">
      <aside className="rv-shell__sidebar">{sidebar}</aside>
      <div className="rv-shell__mobile" data-open={mobileNavOpen || undefined}>
        <button className="rv-shell__mobile-backdrop" type="button" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />
        <aside className="rv-shell__mobile-panel">
          <Button variant="quiet" size="icon" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)}><X aria-hidden="true" /></Button>
          {sidebar}
        </aside>
      </div>
      <div className="rv-shell__frame">
        <header className="rv-shell__header">
          <Button className="rv-shell__menu" variant="quiet" size="icon" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}>
            <Menu aria-hidden="true" />
          </Button>
          <button className="rv-search-pill" type="button" onClick={() => setCommandOpen(true)} aria-label="Search components and actions">
            <Search size={16} aria-hidden="true" />
            <span>Search components and actions</span>
            <kbd>⌘ K</kbd>
          </button>
          <div className="rv-shell__header-actions">
            <Button variant="quiet" size="icon" aria-label="View notifications"><Bell aria-hidden="true" /></Button>
            <Button variant="primary" leadingIcon={<Plus aria-hidden="true" />} aria-label="New project" onClick={onCreate}>New project</Button>
          </div>
        </header>
        <main className={cn("rv-shell__main") }>
          <header className="rv-page-heading">
            <div>
              <h1>{title}</h1>
              {subtitle ? <p>{subtitle}</p> : null}
            </div>
            <span className="rv-page-heading__meta">Example data · Aug 2026</span>
          </header>
          {children}
        </main>
        <footer className="rv-shell__footer">
          <span><strong>Rivet UI</strong> · Next.js component workbench</span>
          <span>WCAG-minded · MIT-ready</span>
        </footer>
      </div>
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} items={commandItems} />
    </div>
  );
}

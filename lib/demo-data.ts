export type ProjectStatus = "On track" | "At risk" | "Blocked";

export interface Project {
  id: string;
  name: string;
  description: string;
  owner: string;
  ownerKey: string;
  status: ProjectStatus;
  statusKey: "on-track" | "at-risk" | "blocked";
  progress: number;
  due: string;
  dueSort: string;
  members: string[];
  updated: string;
}

export const projects: Project[] = [
  {
    id: "RV-104",
    name: "Parcel Notes",
    description: "Editorial workflow and release checklist",
    owner: "Elena Ruiz",
    ownerKey: "elena",
    status: "On track",
    statusKey: "on-track",
    progress: 84,
    due: "Due Aug 18",
    dueSort: "2026-08-18",
    members: ["Elena Ruiz", "Mina Park", "Sam Tan"],
    updated: "12 min ago",
  },
  {
    id: "RV-106",
    name: "Ridgeline Console",
    description: "Infrastructure dashboard navigation",
    owner: "Malik Ross",
    ownerKey: "malik",
    status: "At risk",
    statusKey: "at-risk",
    progress: 62,
    due: "Due Aug 21",
    dueSort: "2026-08-21",
    members: ["Malik Ross", "Kira Bose", "Noah Kim"],
    updated: "38 min ago",
  },
  {
    id: "RV-108",
    name: "Field Manual",
    description: "Operations knowledge base refresh",
    owner: "Mina Park",
    ownerKey: "mina",
    status: "On track",
    statusKey: "on-track",
    progress: 71,
    due: "Due Aug 28",
    dueSort: "2026-08-28",
    members: ["Mina Park", "Elena Ruiz"],
    updated: "1 hr ago",
  },
  {
    id: "RV-111",
    name: "Ledger Import",
    description: "CSV validation and mapping flow",
    owner: "Elena Ruiz",
    ownerKey: "elena",
    status: "Blocked",
    statusKey: "blocked",
    progress: 36,
    due: "Due Sep 02",
    dueSort: "2026-09-02",
    members: ["Elena Ruiz", "Malik Ross"],
    updated: "3 hrs ago",
  },
  {
    id: "RV-113",
    name: "Relay Inbox",
    description: "Shared triage queue and assignments",
    owner: "Malik Ross",
    ownerKey: "malik",
    status: "On track",
    statusKey: "on-track",
    progress: 48,
    due: "Due Sep 05",
    dueSort: "2026-09-05",
    members: ["Malik Ross", "Sam Tan", "Mina Park"],
    updated: "Yesterday",
  },
  {
    id: "RV-117",
    name: "Workshop Mobile",
    description: "Compact review and approval tools",
    owner: "Mina Park",
    ownerKey: "mina",
    status: "At risk",
    statusKey: "at-risk",
    progress: 55,
    due: "Due Sep 09",
    dueSort: "2026-09-09",
    members: ["Mina Park", "Kira Bose"],
    updated: "Yesterday",
  },
];

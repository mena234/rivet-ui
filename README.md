# Rivet UI

Live demo: [https://storybook-library.ramzy.tech/](https://storybook-library.ramzy.tech/)


A general-purpose component workbench built with Next.js, React, TypeScript, and Storybook. The composed workspace demonstrates the primitives together; Storybook documents them in isolation.

## Included

- Responsive application shell with sidebar, mobile navigation, command palette, header, and footer
- KPI strip, project cards, filter bar, tabs, badges, buttons, and empty states
- Sortable and selectable data table with a mobile card presentation
- Native-dialog slide-over drawer with focus management and Escape handling
- Storybook stories for foundations, component states, patterns, and the full workspace
- Local variable fonts, semantic OKLCH tokens, reduced-motion support, and accessible focus states

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Start Storybook separately:

```bash
npm run storybook
```

Open `http://localhost:6006`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run build-storybook
```

Import components from the barrel when working inside this repository:

```tsx
import { Badge, Button, DataTable, Drawer, Tabs } from "@/components/ui";
```

Design tokens live in `tokens.css`; component styles live in `components/ui/ui.css`.

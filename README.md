# Rivet UI

A reusable React component library with an interactive Storybook and a composed dashboard example. Explore individual controls, their states, and the layouts they form together.

**[Open the live demo](https://storybook-library.ramzy.tech/)** · [Developer guide](DEVELOPMENT.md)

## What you can explore

- Buttons, forms, feedback, navigation, identity, overlays, and disclosure components.
- Data tables, filters, tabs, metrics, cards, and dashboard layouts.
- Stories for component states and a composed workspace.
- Shared design tokens, responsive behavior, keyboard interactions, and reduced-motion support.

## Try the demo

1. Open the live Storybook and inspect the composed workspace.
2. Choose a component from the sidebar and compare its examples and states.
3. Try the interactive controls and view the foundations for typography, colour, and spacing.

## Technology

React, TypeScript, Storybook, Vinext/Next.js App Router, CSS design tokens, and Lucide icons.

## Run locally

Use Node.js 24 and npm. No account, API key, or backend service is required. Start the component library directly:

```sh
git clone https://github.com/mena234/rivet-ui.git
cd rivet-ui
npm ci
npm run storybook
```

Open **http://localhost:6006/**. To run the app wrapper that embeds Storybook, first generate the files it serves:

```sh
npm run build-storybook:public
npm run dev
```

Open the app address printed by the server. The wrapper loads `/storybook/index.html`, so it requires that first build step. `npm run build` builds both Storybook and the application. `npm run build-storybook` creates a standalone `storybook-static/` directory.

## Checks

```sh
npm run lint
npm run typecheck
npm run build
```

## Scope and limitations

Dashboard records are sample presentation data. The repository supplies reusable source components; it is not a published npm package or a connected business dashboard. Review and adapt component behavior for your application.

## More detail

See the [developer guide](DEVELOPMENT.md) for imports and styling, [component source](components/ui/), [stories](stories/), and [design tokens](tokens.css).

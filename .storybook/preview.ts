import type { Preview } from "@storybook/react-vite";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "../app/globals.css";
import "../stories/stories.css";
import { DocsPage } from "./DocsPage";

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: "^on[A-Z].*",
      handles: ["click button", "input input", "change input", "change select"],
    },
    controls: { expanded: true },
    docs: { page: DocsPage },
    layout: "fullscreen",
    options: {
      storySort: {
        order: ["Foundations", "Components", "Patterns", "Layout", "Pages"],
      },
    },
    a11y: {
      test: "error",
    },
  },
  tags: ["autodocs"],
};

export default preview;

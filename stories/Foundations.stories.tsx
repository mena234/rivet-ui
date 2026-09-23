import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const swatches = [
  ["Paper", "var(--color-paper)"],
  ["Paper 2", "var(--color-paper-2)"],
  ["Rule", "var(--color-rule)"],
  ["Muted", "var(--color-muted)"],
  ["Ink", "var(--color-ink)"],
  ["Cobalt", "var(--color-accent)"],
  ["Success", "var(--color-success)"],
  ["Error", "var(--color-error)"],
];

export const DesignTokens: Story = {
  render: () => (
    <main className="rv-story-canvas">
      <header className="rv-story-title"><h1>Foundation tokens</h1><p>Cool neutrals, one signal accent, a 4-point spacing scale, and three deliberate type roles.</p></header>
      <section className="rv-story-stack">
        <div className="rv-story-swatches">
          {swatches.map(([label, value]) => (
            <article className="rv-story-swatch" key={label}>
              <div className="rv-story-swatch__color" style={{ "--swatch": value } as React.CSSProperties} />
              <span className="rv-story-swatch__label">{label}</span>
            </article>
          ))}
        </div>
        <dl>
          <div className="rv-story-type"><dt>Display</dt><dd className="rv-story-type__display">Instrument-grade interfaces.</dd></div>
          <div className="rv-story-type"><dt>Body</dt><dd className="rv-story-type__body">Components stay useful under dense content, small screens, keyboard navigation, and async state changes.</dd></div>
          <div className="rv-story-type"><dt>Mono</dt><dd className="rv-story-type__mono">RV-104 · 91% · ⌘ K</dd></div>
        </dl>
      </section>
    </main>
  ),
};

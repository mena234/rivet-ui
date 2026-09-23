export default function Home() {
  return (
    <main className="storybook-host">
      <iframe
        className="storybook-frame"
        src="/storybook/index.html?path=/story/pages-workspace--composed"
        title="Rivet UI Storybook"
      />
    </main>
  );
}

import { spawn } from "node:child_process";
import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const requestedOutput = resolve(process.argv[2] ?? "storybook-static");
const hostedOutput = resolve("public/storybook");
const temporaryOutput = resolve(".sites-storybook-build");
const isHostedBuild = requestedOutput === hostedOutput;
const buildOutput = isHostedBuild ? temporaryOutput : requestedOutput;

if (isHostedBuild) {
  await rm(hostedOutput, { force: true, recursive: true });
  await rm(temporaryOutput, { force: true, recursive: true });
}

await new Promise((resolveBuild, rejectBuild) => {
  const child = spawn(
    process.execPath,
    ["node_modules/storybook/dist/bin/dispatcher.js", "build", "-o", buildOutput],
    {
      env: { ...process.env, RIVET_STORYBOOK_BUILD: "1" },
      shell: false,
      stdio: "inherit",
    },
  );

  child.once("error", rejectBuild);
  child.once("exit", (code) => {
    if (code === 0) resolveBuild();
    else rejectBuild(new Error(`Storybook build exited with code ${code}`));
  });
});

if (isHostedBuild) {
  await mkdir(dirname(hostedOutput), { recursive: true });
  await cp(temporaryOutput, hostedOutput, { recursive: true });
  await rm(temporaryOutput, { force: true, recursive: true });
}

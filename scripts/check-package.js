import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFile } from "node:fs/promises";

const manifest = JSON.parse(await readFile("package.json", "utf8"));
const [packed] = JSON.parse(
  execFileSync("npm", ["pack", "--dry-run", "--ignore-scripts", "--json"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "inherit"],
  }),
);
const files = new Set(packed.files.map(({ path }) => path));
for (const name of ["trace", "trace.classless"]) {
  for (const scope of ["", ".conditional"]) {
    for (const min of ["", ".min"]) {
      assert(files.has(`dist/${name}${scope}${min}.css`), "Missing CSS build");
    }
  }
}
for (const path of [
  "assets/trace-logo.svg",
  "README.md",
  "LICENSE",
  "src/index.css",
  "src/classless.css",
]) {
  assert(files.has(path), `Missing ${path}`);
}
for (const path of files) {
  assert(
    /^(dist\/[^/]+\.css|src\/.+\.css|assets\/trace-logo\.svg|package\.json|README\.md|LICENSE)$/.test(
      path,
    ),
    `Unexpected package file: ${path}`,
  );
}
assert(!manifest.private, "Package must be publishable");
assert(manifest.version, "Package must have a version");
if (process.env.GITHUB_REF_TYPE === "tag") {
  assert.equal(process.env.GITHUB_REF_NAME, `v${manifest.version}`);
}
console.log(
  `${packed.name}@${packed.version}: ${files.size} package files verified`,
);

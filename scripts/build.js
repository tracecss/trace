import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { bundle, transform } from "lightningcss";
import { browserTargets } from "../browser-targets.js";

const outputDirectory = new URL("../dist/", import.meta.url);
await mkdir(outputDirectory, { recursive: true });

for (const [name, entry] of [
  ["trace", "index"],
  ["trace.classless", "classless"],
]) {
  const bundled = bundle({
    filename: fileURLToPath(new URL(`../src/${entry}.css`, import.meta.url)),
    minify: false,
  }).code;

  for (const conditional of [false, true]) {
    // Scoped builds initialize tokens and document defaults on the container.
    const code = conditional
      ? Buffer.from(
          `@scope (.trace-css) {\n${bundled
            .toString()
            .replaceAll(":where(:root)", ":where(:scope)")
            .replaceAll(":where(body)", ":where(:scope)")}\n}\n`,
        )
      : bundled;

    for (const minify of [false, true]) {
      const filename = `${name}${conditional ? ".conditional" : ""}${minify ? ".min" : ""}.css`;
      const result = transform({
        filename,
        code,
        minify,
        targets: browserTargets,
      });
      await writeFile(new URL(filename, outputDirectory), result.code);
      console.log(`dist/${filename}`);
    }
  }
}

import { defineConfig } from "vite";
import { browserTargets } from "./browser-targets.js";

export default defineConfig({
  base: "./",
  css: {
    transformer: "lightningcss",
    lightningcss: { targets: browserTargets },
  },
  server: { host: "localhost", port: 3000, strictPort: true },
  preview: { host: "localhost", port: 3000, strictPort: true },
});

import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "./vite-plugin-handlebars-precompile";

export default defineConfig({
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
    sourcemap: false,
  },
  plugins: [handlebars()],
});

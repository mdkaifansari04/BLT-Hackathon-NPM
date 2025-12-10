import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom", "chart.js", "react-chartjs-2"],
  splitting: false,
  sourcemap: true,
  clean: true,
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
  resolve: {
    alias: {
      "@ui": path.resolve(__dirname, "./ui/src/index.ts"),
      "@": path.resolve(__dirname, "src"),
    },
  },
});

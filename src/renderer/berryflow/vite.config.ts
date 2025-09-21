import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@common": resolve(__dirname, "../common"),
    },
  },
  build: {
    outDir: "../../../out/renderer/berryflow",
    emptyOutDir: true,
    rollupOptions: {
      external: ["electron"],
    },
  },
});
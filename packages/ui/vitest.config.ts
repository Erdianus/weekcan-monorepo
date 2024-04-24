import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@ui", replacement: resolve(__dirname, "./src") }],
  },
  test: {
    environment: "jsdom",
  },
});

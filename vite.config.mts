import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true, // Allows using global variables like `describe` and `it`
    setupFiles: "src/setupTests.ts",
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [react()],
});

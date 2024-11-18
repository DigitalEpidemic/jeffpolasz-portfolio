import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true, // Allows using global variables like `describe` and `it`
    setupFiles: "src/setupTests.ts",
  },
  plugins: [react()],
});

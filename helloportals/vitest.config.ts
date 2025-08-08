import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/lib/portal-schema/__tests__/**/*.test.ts"],
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
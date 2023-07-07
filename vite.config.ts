import { defineConfig, configDefaults } from "vitest/config"
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    globals: true,
    reporters: ["dist"],
  },
})

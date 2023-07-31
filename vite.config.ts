import { defineConfig, configDefaults } from "vitest/config"
export default defineConfig({
  base: "/2048v2/",
  test: {
    exclude: [...configDefaults.exclude, "packages/template/*"],
    globals: true,
  },
})

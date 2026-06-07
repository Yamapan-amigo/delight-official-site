import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
  resolve: {
    alias: {
      // tsconfig の "@/*" -> "src/*" に合わせる
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  test: {
    // Bật các API toàn cục (globals) giống như Jest (describe, it, expect)
    globals: true,

    // Cần 'jsdom' để mô phỏng DOM (môi trường trình duyệt)
    environment: "jsdom",

    // Chỉ định file setup sẽ chạy trước mỗi file test
    setupFiles: "./setupTests.js",
  },
});

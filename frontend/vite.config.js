import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 1. Kích hoạt JUnit reporter
    reporters: ["default", "junit"],

    // 2. Chỉ định đường dẫn và tên file output
    // Thư mục 'test-results' sẽ được tạo tự động trong thư mục frontend
    outputFile: {
      junit: "test-results/report.xml",
    },

    coverage: {
      reporter: ["text", "json", "lcov"],
    },
  },
});

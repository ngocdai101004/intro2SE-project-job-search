import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Tải biến môi trường từ file .env
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      // Cấu hình server tại đây nếu cần
      cors: true, // Kích hoạt CORS
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV), // Ví dụ định nghĩa biến môi trường
    },
    build: {
      // Tùy chọn build tại đây
      outDir: "dist", // Đường dẫn thư mục đầu ra
    },
  };
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/undangan-nikah-ghulam/",
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});

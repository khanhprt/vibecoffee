import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  return {
    base: env.VITE_BASE_PATH || "/",
    define: {
      "import.meta.env.VITE_DEMO_MODE": JSON.stringify(env.VITE_DEMO_MODE || (mode === "demo" ? "true" : "false")),
      "import.meta.env.VITE_ROUTER_MODE": JSON.stringify(env.VITE_ROUTER_MODE || (mode === "demo" ? "hash" : "browser"))
    },
    plugins: [react()],
    server: {
      port: 5173,
      host: "0.0.0.0"
    }
  };
});

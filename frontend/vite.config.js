import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE_");
  const demoByDefault = mode !== "api";
  return {
    base: env.VITE_BASE_PATH || "/",
    define: {
      "import.meta.env.VITE_DEMO_MODE": JSON.stringify(env.VITE_DEMO_MODE || (demoByDefault ? "true" : "false")),
      "import.meta.env.VITE_ROUTER_MODE": JSON.stringify(env.VITE_ROUTER_MODE || (demoByDefault ? "hash" : "browser"))
    },
    plugins: [react()],
    server: {
      port: 5173,
      host: "0.0.0.0"
    }
  };
});

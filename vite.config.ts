import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "dotenv";

config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    "process.env": process.env,
    ENV_KEY: process.env.ENV_KEY,
  },
});

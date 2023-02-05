import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import path from "path";

const config: UserConfig = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@consts": path.resolve(__dirname, "./src/consts"),
      "@types": path.resolve(__dirname, "./src/types"),
      "@app.postcss": path.resolve(__dirname, "./src/app.postcss"),
    },
  },
  plugins: [sveltekit()],
};

export default config;

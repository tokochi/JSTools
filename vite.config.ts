import { rmSync } from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import electron from "vite-electron-plugin";
import renderer from "vite-plugin-electron-renderer";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  rmSync("dist-electron", { recursive: true, force: true });
  const sourcemap = command === "serve" || !!process.env.VSCODE_DEBUG;
  return {   
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    plugins: [
      react(),
      electron({
        include: ["electron"],


        transformOptions: {
          sourcemap,
        },
      }),
      // Use Node.js API in the Renderer-process
      renderer({
        nodeIntegration: true,
      }),
    ],
    build: {
      rollupOptions: {
        input: {
          index: path.join(__dirname, "index.html"),
          Toolbar: path.join(__dirname, "toolbar.html"),
        },
      },
    },
    clearScreen: false,
  };
});




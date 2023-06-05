import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import monacoEditorPlugin from "./plugins/index";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});
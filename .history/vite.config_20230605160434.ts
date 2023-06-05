import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import monacoEditorPlugin from "vite-plugin-monaco-editor";
const s = monacoEditorPlugin({
  languageWorkers: ["css", "html", "json", "typescript"],
});
console.log(s);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

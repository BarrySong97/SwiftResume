import * as monacoThemes from "monaco-themes";
import * as monaco from "monaco-editor";
import data from "./themes/Monokai.json";
// monacoThemes.registerThemes();

const styleNames = ["Monokai", "Dracula" /* ... */];
monaco.editor.defineTheme("monokai", data);

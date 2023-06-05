import * as monaco from "monaco-editor";
import data from "./themes/Twilight.json";
// monacoThemes.registerThemes();

const styleNames = ["Monokai", "Dracula" /* ... */];
monaco.editor.defineTheme("monokai", data);

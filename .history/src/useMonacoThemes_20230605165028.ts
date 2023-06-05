import * as monacoThemes from "monaco-themes";
import * as monaco from "monaco-editor";
monacoThemes.registerThemes();

const styleNames = ["Monokai", "Dracula" /* ... */];
styleNames.forEach((styleName) => {
  monaco.editor.defineTheme(
    `myCustomTheme_${styleName}`,
    monacoThemes.getTheme(styleName)
  );
});

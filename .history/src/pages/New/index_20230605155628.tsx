import { FC, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export interface NewResumeProps {}
const NewResume: FC<NewResumeProps> = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [preview, setPreview] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const iframeContent = `
        <html>
          <head>
            <style>${cssCode}</style>
          </head>
          <body>${htmlCode}</body>
        </html>
      `;
      setPreview(iframeContent);
    }, 500);

    return () => clearTimeout(timeout);
  }, [htmlCode, cssCode]);

  const handleHtmlCodeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setHtmlCode(event.target.value);
  };

  const handleCssCodeChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCssCode(event.target.value);
  };
  const options = {
    selectOnLineNumbers: true,
  };
  return (
    <div className="p-4">
      <div>
        <label>HTML:</label>
        <textarea value={htmlCode} onChange={handleHtmlCodeChange} rows={10} />
        <MonacoEditor
          width="800"
          height="600"
          language="javascript"
          theme="vs-dark"
          options={options}
          // onChange={::this.onChange}
          // editorDidMount={::this.editorDidMount}
        />
      </div>
      <div>
        <label>CSS:</label>
        <textarea value={cssCode} onChange={handleCssCodeChange} rows={5} />
      </div>
      <div>
        <iframe
          srcDoc={preview}
          title="Code Preview"
          style={{ width: "100%", height: "400px" }}
        />
      </div>
    </div>
  );
};

export default NewResume;

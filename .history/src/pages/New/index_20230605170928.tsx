import { FC, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import theme from "./themes/twilight.json";
import { editor } from "monaco-editor";
const NewResume: FC = () => {
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
          language="html"
          theme="twilight"
          options={options}
          // onChange={::this.onChange}
          editorDidMount={(_, monaco) => {
            monaco.editor.defineTheme(
              "twilight",
              theme as editor.IStandaloneThemeData
            );
          }}
        />
      </div>
      <div>
        <label>CSS:</label>
        <textarea value={cssCode} onChange={handleCssCodeChange} rows={5} />
        <MonacoEditor
          width="800"
          height="600"
          language="css"
          theme="twilight"
          options={options}
        />
      </div>
      <div>
        <MonacoEditor
          width="800"
          height="600"
          language="json"
          theme="twilight"
          options={options}
        />
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

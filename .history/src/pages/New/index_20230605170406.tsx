import { FC, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import theme from "./themes/twilight.json";
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
          theme="twilight"
          options={options}
          // onChange={::this.onChange}
          editorDidMount={(editor, monaco) => {
            monaco.editor.defineTheme("twilight", theme);
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
          editorDidMount={(editor, monaco) => {
            monaco.editor.defineTheme("twilight", theme);
          }}
          // onChange={::this.onChange}
          // editorDidMount={::this.editorDidMount}
        />
      </div>
      <div>
        <MonacoEditor
          width="800"
          height="600"
          language="json"
          // theme="twilight"
          options={options}
          // onChange={::this.onChange}
          // editorDidMount={::this.editorDidMount}
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

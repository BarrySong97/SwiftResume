import { FC } from "react";
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
  return (
    <div className="p-4">
      <div>
        <label>HTML:</label>
        <textarea value={htmlCode} onChange={handleHtmlCodeChange} rows={10} />
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

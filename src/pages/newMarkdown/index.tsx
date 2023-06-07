import { FC, useState } from "react";
import { marked } from "marked";
import "bytemd/dist/index.css";
import { Editor } from "@bytemd/react";
import "./themes/nuxt.css";
import "./editor.css";
import { cssString } from "./css";
import gfm from "@bytemd/plugin-gfm";
import { Button } from "@douyinfe/semi-ui";
import axios from "axios";
import { useBoolean } from "ahooks";
import DownloadPdfModal, {
  PdfMargin,
} from "../New/components/DownloadPdfModal";
import { useTranslation } from "react-i18next";
const plugins = [
  gfm(),
  // Add more plugins here
];
export interface NewMarkdownProps {}
const NewMarkdown: FC<NewMarkdownProps> = () => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();
  const [
    downloadPdfModalShow,
    { setTrue: setDownloadPdfModalShow, setFalse: setDownloadPdfModalHide },
  ] = useBoolean(false);
  const renderHtml = () => {
    if (!value) return;
    const htmlString = marked(value);
    const renderedContent = `
        <html>
          <head>
            <style>${cssString}</style>
          </head>
          <body>${htmlString}</body>
        </html>
      `;
    return renderedContent;
  };
  const prtinPdf = (margin: PdfMargin) => {
    const preview = renderHtml();
    if (!preview) {
      return;
    }
    axios({
      url: "/api/pdf", // 替换为实际的 PDF 文件地址
      method: "post",
      data: {
        template: preview,
        margin: margin,
      },
      responseType: "blob", // 指定响应类型为二进制数据
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${margin.name}.pdf`); // 设置下载文件的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };
  return (
    <div className="flex ">
      <div>
        <Button onClick={setDownloadPdfModalShow}>pdf</Button>
      </div>
      <Editor
        value={value}
        plugins={plugins}
        onChange={(v) => {
          setValue(v);
        }}
      />
      <DownloadPdfModal
        title={t("new.downloadTitle")}
        visible={downloadPdfModalShow}
        onOk={setDownloadPdfModalHide}
        onCancel={setDownloadPdfModalHide}
        onDownload={(e) => {
          prtinPdf(e);
        }}
      />
      {/* <div className="flex-1">
        <ReactMarkdown
          children={value}
          remarkPlugins={[remarkGfm]}
        ></ReactMarkdown>
      </div> */}
    </div>
  );
};

export default NewMarkdown;

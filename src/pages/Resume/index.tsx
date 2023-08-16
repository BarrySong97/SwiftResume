import { FC, useEffect, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { Helmet } from "react-helmet";
import theme from "./themes/twilight.json";
import axios from "axios";
import { editor } from "monaco-editor";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Handlebars from "handlebars";
import "./tab.css";
import { VscodeIconsFileTypeHtml } from "../../assets/icons/HTML";
import { VscodeIconsFileTypeCss } from "../../assets/icons/CSS";
import { VscodeIconsFileTypeLightJson } from "../../assets/icons/Json copy";
import { Notification } from "@douyinfe/semi-ui";
import {
  useBoolean,
  useDebounceEffect,
  useDebounceFn,
  useRequest,
  useSize,
} from "ahooks";
import { useTranslation } from "react-i18next";
import { MaterialSymbolsSettingsSuggestOutline } from "../../assets/icons/AddResource";
import AddResouceModal from "./components/addResouceModal";
import { Tooltip } from "@douyinfe/semi-ui";
import { IcRoundPictureAsPdf } from "../../assets/icons/PDF";
import DownloadPdfModal, { PdfMargin } from "./components/DownloadPdfModal";
import { json, useParams } from "react-router-dom";
import { ResumeService } from "../../api";
const jsonInit = {
  name: "Barry Song",
};
const htmlInit = '<div class="color">{{name}}</div>';
const cssInit = ".color{color:red}";
const NewHTMLResume: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [htmlCode, setHtmlCode] = useState(htmlInit);
  const [cssCode, setCssCode] = useState(cssInit);
  const [jsonCode, setJsonCode] = useState(JSON.stringify(jsonInit, null, 2));
  const [headCode, setHeadCode] = useState("");
  const [preview, setPreview] = useState("");
  const size = useSize(document.querySelector("body"));
  const [
    addResourceModalShow,
    { setTrue: setAddResourceModalShow, setFalse: setAddResourceModalHide },
  ] = useBoolean(false);
  const [
    downloadPdfModalShow,
    { setTrue: setDownloadPdfModalShow, setFalse: setDownloadPdfModalHide },
  ] = useBoolean(false);
  const renderTemplate = (html: string, data: Record<string, any>) => {
    try {
      const template = Handlebars.compile(html);
      return template(data);
    } catch (error) {
      console.log(error);
    }
  };
  const compositionCode = (html: string, json: string, css: string) => {
    if (!json) return;
    // if (!html) return;
    const data = JSON.parse(json);
    const renderedHtml = renderTemplate(html, { resume: data });

    const iframeContent = `
        <html>
          <head>
            ${headCode}
            <style>${css}</style>
          </head>
          <body>${renderedHtml}</body>
        </html>
      `;
    return iframeContent;
  };
  useDebounceEffect(
    () => {
      try {
        ResumeService.resumeControllerUpdate(id!, {
          html: htmlCode,
          css: cssCode,
          json: jsonCode,
          head: headCode,
        });
        const result = compositionCode(htmlCode, jsonCode, cssCode);
        setPreview(result ?? "");
      } catch (error) {
        console.log(error);
        Notification.error({
          title: "Error",
          content: "Error parsing JSON or HTML template",
        });
      }
    },
    [htmlCode, jsonCode, cssCode, headCode],
    {
      wait: 1000,
    }
  );
  useRequest(() => ResumeService.resumeControllerFindOne(id!), {
    onSuccess(data) {
      const { css, head, html, json } = data;
      setCssCode(css ?? cssInit);
      setHtmlCode(html ?? htmlInit);
      setJsonCode(json);
      setHeadCode(head ?? "");
    },
  });

  const handleHtmlCodeChange = (content: string) => {
    setHtmlCode(content);
  };

  const handleCssCodeChange = (content: string) => {
    setCssCode(content);
  };

  const options = {
    selectOnLineNumbers: true,
  };

  const prtinPdf = (margin: PdfMargin) => {
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

  const { t } = useTranslation();
  return (
    <div className="h-screen flex">
      <Helmet>
        <meta charSet="utf-8" />
        <title>New HTML resume - Swift Resume</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="w-1/2 relative">
        <Tabs>
          <TabList>
            <Tab>
              <div className="tab-border-top-container"></div>
              <div className="flex items-center justify-center">
                <VscodeIconsFileTypeHtml className="mr-2 mt-1" />
                HTML
              </div>
            </Tab>
            <Tab>
              <div className="tab-border-top-container"></div>
              <div className="flex items-center justify-center">
                <VscodeIconsFileTypeCss className="mr-2 mt-1" />
                CSS
              </div>
            </Tab>
            <Tab>
              <div className="tab-border-top-container"></div>
              <div className="flex items-center justify-center">
                <VscodeIconsFileTypeLightJson className="mr-2 mt-1" />
                JSON
              </div>
            </Tab>
            <div
              onClick={setAddResourceModalShow}
              className="absolute z-30 right-4 top-1 cursor-pointer text-xl"
            >
              <Tooltip content={t("new.addHead")}>
                <MaterialSymbolsSettingsSuggestOutline />
              </Tooltip>
            </div>
          </TabList>

          <TabPanel>
            <MonacoEditor
              language="html"
              theme="twilight"
              options={options}
              // height={"100vh"}
              key={size?.width}
              value={htmlCode}
              onChange={(e) => {
                handleHtmlCodeChange(e);
              }}
              editorDidMount={(_, monaco) => {
                const saveCommandId = "save";
                monaco.editor.addEditorAction({
                  id: saveCommandId,
                  label: "Save",
                  keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS],
                  run: () => {
                    // 在此处添加保存操作的逻辑
                    console.log("Ctrl+S pressed");
                  },
                });
                monaco.editor.defineTheme(
                  "twilight",
                  theme as editor.IStandaloneThemeData
                );
              }}
            />
          </TabPanel>
          <TabPanel>
            <MonacoEditor
              onChange={(e) => {
                handleCssCodeChange(e);
              }}
              key={size?.width}
              language="css"
              theme="twilight"
              value={cssCode}
              options={options}
            />
          </TabPanel>
          <TabPanel>
            <MonacoEditor
              value={jsonCode}
              key={size?.width}
              onChange={(e) => {
                setJsonCode(e);
              }}
              language="json"
              theme="twilight"
              options={options}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <Tooltip content={t("new.printPdf")}>
          <div
            onClick={setDownloadPdfModalShow}
            className="absolute z-30 right-3 top-2 cursor-pointer text-xl"
          >
            <IcRoundPictureAsPdf />
          </div>
        </Tooltip>
        <iframe
          srcDoc={preview}
          title="Code Preview"
          className="h-full w-full"
        />
      </div>
      <AddResouceModal
        visible={addResourceModalShow}
        onOk={setAddResourceModalHide}
        onCancel={setAddResourceModalHide}
        onChange={(e) => setHeadCode(e)}
        title={t("new.addResource")}
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
    </div>
  );
};

export default NewHTMLResume;

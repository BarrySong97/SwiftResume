import { FC, useState } from "react";
import MonacoEditor from "react-monaco-editor";
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
import { useBoolean, useDebounceEffect } from "ahooks";
import { useTranslation } from "react-i18next";
import { MaterialSymbolsSettingsSuggestOutline } from "../../assets/icons/AddResource";
import AddResouceModal from "./components/addResouceModal";
import { IcRoundPictureAsPdf } from "../../assets/icons/PDF";
const NewResume: FC = () => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsonCode, setJsonCode] = useState("");
  const [headCode, setHeadCode] = useState("");
  const [preview, setPreview] = useState("");
  const [
    addResourceModalShow,
    { setTrue: setAddResourceModalShow, setFalse: setAddResourceModalHide },
  ] = useBoolean(false);
  const renderTemplate = (html: string, data: Record<string, any>) => {
    const template = Handlebars.compile(html);
    return template(data);
  };
  const compositionCode = (html: string, json: string, css: string) => {
    if (!json) return;
    if (!html) return;
    const data = JSON.parse(json);
    const renderedHtml = renderTemplate(html, data);

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
    [jsonCode, htmlCode, cssCode, headCode],
    {
      wait: 1000,
    }
  );

  const handleHtmlCodeChange = (content: string) => {
    setHtmlCode(content);
  };

  const handleCssCodeChange = (content: string) => {
    setCssCode(content);
  };

  const options = {
    selectOnLineNumbers: true,
  };
  const prtinPdf = () => {
    axios({
      url: "/api/pdf", // 替换为实际的 PDF 文件地址
      method: "post",
      data: {
        template: preview,
      },
      responseType: "blob", // 指定响应类型为二进制数据
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf"); // 设置下载文件的文件名
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
              className="absolute z-30 right-4 top-2 cursor-pointer"
            >
              <MaterialSymbolsSettingsSuggestOutline />
            </div>
          </TabList>

          <TabPanel>
            <MonacoEditor
              language="html"
              theme="twilight"
              options={options}
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
              language="css"
              theme="twilight"
              value={cssCode}
              options={options}
            />
          </TabPanel>
          <TabPanel>
            <MonacoEditor
              value={jsonCode}
              onChange={(e) => setJsonCode(e)}
              language="json"
              theme="twilight"
              options={options}
            />
          </TabPanel>
        </Tabs>
      </div>
      <div className="relative flex-1 relative overflow-hidden">
        <div
          onClick={() => prtinPdf()}
          className="absolute z-30 right-6 top-2 cursor-pointer"
        >
          <IcRoundPictureAsPdf />
        </div>
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
    </div>
  );
};

export default NewResume;

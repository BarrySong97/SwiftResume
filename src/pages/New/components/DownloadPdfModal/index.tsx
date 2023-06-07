import { Form, FormApi } from "@douyinfe/semi-ui/lib/es/form";
import Section from "@douyinfe/semi-ui/lib/es/form/section";
import Modal, { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import { FC, useRef } from "react";
import { useTranslation } from "react-i18next";
export type PdfMargin = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  unit: string;
  name: string;
};
export interface DownloadPdfModalProps extends ModalReactProps {
  onDownload: (margin: PdfMargin) => void;
}
const DownloadPdfModal: FC<DownloadPdfModalProps> = ({
  onDownload,
  ...props
}) => {
  const ref = useRef<FormApi<PdfMargin>>();
  const { t } = useTranslation();
  return (
    <Modal
      {...props}
      keepDOM
      onOk={(e) => {
        const values = ref.current?.getValues();
        if (values) {
          onDownload(values);
        }
        props.onOk?.(e);
      }}
    >
      <Form<PdfMargin>
        getFormApi={(api) => {
          ref.current = api;
        }}
        initValues={{
          top: 0.4,
          left: 0.4,
          right: 0.4,
          bottom: 0.4,
          unit: "in",
          name: "Resume",
        }}
      >
        <Section text={t("new.downloadSection1")}>
          <Form.Input field="name" label={t("new.downloadFormFiledName")} />
        </Section>
        <Section text={t("new.downloadSection2")}>
          <Form.InputNumber step={0.1} min={0} field="top" label="Top" />
          <Form.InputNumber step={0.1} min={0} field="left" label="Left" />
          <Form.InputNumber step={0.1} min={0} field="right" label="Right" />
          <Form.InputNumber step={0.1} min={0} field="bottom" label="Bottom" />
          <Form.Select field="unit" label="Unit">
            <Form.Select.Option value="in">in</Form.Select.Option>
            <Form.Select.Option value="cm">cm</Form.Select.Option>
            <Form.Select.Option value="mm">mm</Form.Select.Option>
            <Form.Select.Option value="px">px</Form.Select.Option>
          </Form.Select>
        </Section>
      </Form>
    </Modal>
  );
};

export default DownloadPdfModal;

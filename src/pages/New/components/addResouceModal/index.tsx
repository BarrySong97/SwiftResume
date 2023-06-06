import { TextArea } from "@douyinfe/semi-ui";
import Modal, { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import { FC, useState } from "react";
export type ResouceType = {
  type: "js" | "css" | "font";
  url: string[];
};
export interface AddResouceModalProps extends ModalReactProps {
  onChange: (code: string) => void;
}
const AddResouceModal: FC<AddResouceModalProps> = ({ onChange, ...props }) => {
  const [headContent, setContent] = useState("");
  return (
    <Modal
      {...props}
      onOk={(e) => {
        onChange(headContent);
        props.onOk?.(e);
      }}
    >
      <div className="mb-2">HTML Head</div>
      <TextArea value={headContent} onChange={(e) => setContent(e)} />
    </Modal>
  );
};

export default AddResouceModal;

import Modal, { ModalReactProps } from "@douyinfe/semi-ui/lib/es/modal";
import { FC } from "react";
export interface AddModalProps extends ModalReactProps {}
const AddModal: FC<AddModalProps> = ({ ...props }) => {
  return <Modal {...props}>Hello AddModal</Modal>;
};

export default AddModal;

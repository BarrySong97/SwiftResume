import { Button, Typography } from "@douyinfe/semi-ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import AddModal from "./components/AddModal";
import { useBoolean } from "ahooks";
export interface HomeProps {}
const { Title, Text } = Typography;
const Home: FC<HomeProps> = () => {
  const { t } = useTranslation();
  const [
    addModalVisible,
    { setTrue: setAddModalShow, setFalse: setAddModalHide },
  ] = useBoolean(false);
  return (
    <>
      <div className="pt-20 px-8">
        <div className="flex items-center justify-between">
          <Title heading={3} type="secondary" strong>
            {t("home.title")}
          </Title>
          <Button type="primary" onClick={setAddModalShow} theme="solid">
            {t("home.addButton")}
          </Button>
        </div>
      </div>
      <AddModal
        title={t("addModal.title")}
        footer={null}
        visible={addModalVisible}
        onOk={setAddModalHide}
        onCancel={setAddModalHide}
      />
    </>
  );
};

export default Home;

import { Button, Typography } from "@douyinfe/semi-ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ResumeService } from "../../api";
import { useAuth } from "../../auth";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
export interface HomeProps {}
const { Title, Text } = Typography;
const Home: FC<HomeProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: "resume",
    retry: false,
    refetchOnWindowFocus: false,
    structuralSharing: false,
    queryFn: ResumeService.resumeControllerFindAll,
  });
  return (
    <>
      <div className="pt-20 px-8">
        <div className="flex items-center justify-between">
          <Title heading={3} type="secondary" strong>
            {t("home.title")}
          </Title>
          <Button
            type="primary"
            onClick={async () => {
              const data = await ResumeService.resumeControllerCreate({
                title: "简历1",
                html: "",
                json: "",
                css: "",
                userId: user?.id ?? "",
              });
              navigate(`/resume/${data.id}`);
            }}
            theme="solid"
          >
            {t("home.addButton")}
          </Button>
        </div>
        <div className="grid grid-cols-8 gap-4 mt-4">
          {data?.map((item) => {
            return (
              <div
                onClick={() => {
                  navigate(`/resume/${item.id}`);
                }}
                className="shadow-xl cursor-pointer  rounded-md border border-gray-200"
              >
                <img
                  src={item.previewImage}
                  className="h-[280px] w-[50px]"
                  alt={item.title}
                />
                <h1 className="text-sm font-bold ml-2 mb-2">{item.title}</h1>
              </div>
            );
          })}
        </div>
      </div>
      {/* <AddModal
        title={t("addModal.title")}
        footer={null}
        visible={addModalVisible}
        onOk={setAddModalHide}
        onCancel={setAddModalHide}
      /> */}
    </>
  );
};

export default Home;

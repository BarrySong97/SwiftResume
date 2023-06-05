import { FC } from "react";
export interface NewResumeProps {}
const NewResume: FC<NewResumeProps> = () => {
  return (
    <div className="p-4">
      <input type="text" />
      <input type="text" />
      <input type="text" />
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

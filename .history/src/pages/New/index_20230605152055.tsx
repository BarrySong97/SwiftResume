import { FC } from "react";
export interface NewResumeProps {}
const NewResume: FC<NewResumeProps> = () => {
  return (
    <div className="p-4">
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
  );
};

export default NewResume;

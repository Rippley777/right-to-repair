import * as UI from "@ui";
import { TbColumns3, TbSearch, TbSettings } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

const Toolbar = () => {
  console.log({ UI });
  const devMode = process.env.NODE_ENV === "debug";
  return (
    <div
      className={twMerge(
        "flex space-between gap-2 p-2 shadow",
        devMode && "bg-green-600"
      )}
    >
      <TbSearch color="white" size={32} />
      <TbColumns3 color="white" size={32} />
      <TbSettings color="white" size={32} />
    </div>
  );
};

export default Toolbar;

import { ActionItemProps } from "./ActionsPanel";

const ActionItem: React.FC<ActionItemProps> = ({ icon, title, trigger }) => {
  return (
    <div className="flex px-4 py-1" onClick={trigger}>
      <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#292929] text-[#FFFFFF] gap-2 pl-5 text-base font-bold leading-normal tracking-[0.015em]">
        {icon}
        <span className="truncate">{title}</span>
      </button>
    </div>
  );
};

export default ActionItem;

import {
  TbChevronDown,
  TbChevronRight,
  TbDownload,
  TbSend,
  TbSettings,
  TbTrash,
} from "react-icons/tb";

import ActionItem from "./ActionItem";

export type ActionItemProps = {
  icon?: React.ReactNode;
  title: string;
  trigger: () => void;
};

type ActionsPanelProps = {
  actionsExpanded: boolean;
  handleExpandClick: () => void;
};

const ActionsPanel: React.FC<ActionsPanelProps> = ({
  handleExpandClick,
  actionsExpanded,
}) => {
  const actions = [
    {
      title: "Update",
      icon: <TbSend color="white" size={24} />,
      trigger: () => console.log("Update"),
    },
    {
      title: "Export",
      icon: <TbDownload color="white" size={24} />,
      trigger: () => console.log("Update"),
    },
    {
      title: "Delete Filters",
      icon: <TbTrash color="white" size={24} />,
      trigger: () => console.log("Update"),
    },
    {
      title: "Advanced",
      icon: <TbSettings color="white" size={24} />,
      trigger: () => console.log("Update"),
    },
  ];
  return (
    <>
      <h3
        onClick={handleExpandClick}
        className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
      >
        Actions
        {actionsExpanded ? (
          <TbChevronDown className="inline" />
        ) : (
          <TbChevronRight className="inline" />
        )}
      </h3>
      {actionsExpanded ? (
        <div>
          {actions.map((action: ActionItemProps) => (
            <ActionItem {...action} />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ActionsPanel;

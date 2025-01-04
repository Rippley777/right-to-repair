import React from "react";
import ActionsPanel from "./ActionsPanel";

type ActionsProps = {
  actionsExpanded: boolean;
  handleExpandClick: () => void;
  handleRefresh: () => void;
  handleSearch: () => void;
  handleUpdate: () => void;
};
const Actions: React.FC<ActionsProps> = ({
  actionsExpanded,
  handleExpandClick,
  handleRefresh,
  handleSearch,
  handleUpdate,
}) => {
  return (
    <ActionsPanel
      actionsExpanded={actionsExpanded}
      handleExpandClick={handleExpandClick}
      handleRefresh={handleRefresh}
      handleSearch={handleSearch}
      handleUpdate={handleUpdate}
    />
  );
};

export default Actions;

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import { toggleActionsExpanded } from "../../../../../store/reducers/table/features";
import ActionsPanel from "./ActionsPanel";

const Actions = () => {
  const dispatch = useDispatch();
  const { actionsExpanded } = useSelector(
    (state: RootState) => state.table.features
  );

  const handleExpandClick = () => {
    dispatch(toggleActionsExpanded());
  };
  return (
    <ActionsPanel
      actionsExpanded={actionsExpanded}
      handleExpandClick={handleExpandClick}
    />
  );
};

export default Actions;

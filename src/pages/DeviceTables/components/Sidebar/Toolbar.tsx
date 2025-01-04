import * as UI from "@ui";
import {
  TbColumns3,
  TbSearch,
  TbSettings,
  TbRefresh,
  TbEdit,
  TbEye,
  TbSend,
  TbTrash,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AppDispatch } from "@/store/store";
import { fetchDevices } from "@/store/reducers/devices";
import { resetFilters } from "@/store/reducers/table/filter";
import {
  toggleEditFilters,
  toggleHeaderGroups,
  toggleSearch,
} from "@/store/reducers/table/features";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

const Toolbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  console.log({ UI });
  const debugMode = useDebugMode();

  const handleUpdate = () => {
    dispatch(fetchDevices({}));
  };

  const handleSearch = () => {
    dispatch(toggleSearch());
  };

  const handleRefresh = () => {
    dispatch(resetFilters());
    dispatch(fetchDevices({}));
  };

  const handleEdit = () => {
    dispatch(toggleEditFilters());
  };

  const handleViewHeaders = () => {
    dispatch(toggleHeaderGroups());
  };

  return (
    <div
      className={twMerge(
        "flex justify-end gap-2 p-2 shadow",
        debugMode && "bg-fuchsia-700"
      )}
    >
      <TbSend color="white" size={24} onClick={handleUpdate} />
      <TbSearch color="white" size={24} onClick={handleSearch} />
      <TbEdit color="white" size={24} onClick={handleEdit} />
      {debugMode ? (
        <TbEye color="white" size={24} onClick={handleViewHeaders} />
      ) : null}
      <TbColumns3 color="white" size={24} />
      <TbSettings color="white" size={24} />
      <TbRefresh color="white" size={24} onClick={handleRefresh} />
      <TbTrash size={24} />
    </div>
  );
};

export default Toolbar;

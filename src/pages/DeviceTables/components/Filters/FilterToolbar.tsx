import * as UI from "@ui";
import {
  TbColumns3,
  TbSearch,
  TbSettings,
  TbRefresh,
  TbEdit,
  TbEye,
} from "react-icons/tb";
import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { AppDispatch } from "../../../../store/store";
import { fetchDevices } from "../../../../store/reducers/devices";
import { resetFilters } from "../../../../store/reducers/table/filter";
import {
  toggleEditFilters,
  toggleHeaderGroups,
  toggleSearch,
} from "../../../../store/reducers/table/features";

const Toolbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  console.log({ UI });
  const devMode = process.env.NODE_ENV === "debug";

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
        devMode && "bg-green-600"
      )}
    >
      <TbSearch color="white" size={32} onClick={handleSearch} />
      <TbEdit color="white" size={32} onClick={handleEdit} />
      <TbEye color="white" size={32} onClick={handleViewHeaders} />
      <TbColumns3 color="white" size={32} />
      <TbSettings color="white" size={32} />
      <TbRefresh color="white" size={32} onClick={handleRefresh} />
    </div>
  );
};

export default Toolbar;

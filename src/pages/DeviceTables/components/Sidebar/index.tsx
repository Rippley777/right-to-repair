import { Table as TableType } from "@tanstack/react-table";

import DevModeToggle from "@/components/dev/DevModeToggle";
import useDebugMode from "@/hooks/dev/useDebugMode";
import { Device } from "@/types";

import FilterHandler from "../Filters/Handler";
import Actions from "./Actions";
import Sort from "./Sort";
import Columns from "./Columns";
import ToggleInstantSearch from "../shared/ToggleInstantSearch";

type SidebarProps = {
  table: TableType<Device>;
};

export type SidebarSectionProps = {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ table }) => {
  const debugMode = useDebugMode();

  if (debugMode) console.log({ table });

  return (
    <div className="layout-content-container flex flex-col justify-start w-[360px]">
      <div className="bg-[#242424] rounded-xl m-4 py-6">
        {/* Handler */}
        <ToggleInstantSearch />
        <FilterHandler />
        <Actions />
        <Columns table={table} />
        <Sort />
      </div>
      <DevModeToggle />
    </div>
  );
};

export default Sidebar;

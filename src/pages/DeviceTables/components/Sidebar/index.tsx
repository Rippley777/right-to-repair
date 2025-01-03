import { Table as TableType } from "@tanstack/react-table";

import { Device } from "../../../../types";

import Actions from "./Actions";
import Sort from "./Sort";
import Columns from "./Columns";
import DevModeToggle from "../../../../components/dev/DevModeToggle";

type SidebarProps = {
  table: TableType<Device>;
};

export type SidebarSectionProps = {
  expand: boolean;
  setExpand: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({ table }) => {
  console.log({ table });
  return (
    <div className="layout-content-container flex flex-col justify-start w-[360px]">
      <div className="bg-[#242424] rounded-xl m-4 py-6">
        <span className="text-2xl">Custom Filters</span>
        <Columns table={table} />
        <Actions />
        <Sort />
      </div>
      <DevModeToggle />
    </div>
  );
};

export default Sidebar;

// import { flexRender, Table as TableType } from "@tanstack/react-table";
// import { Device } from "../../../types";
// import RepairabilityChart from "../Charts/Repairability/chart";

import Actions from "./Actions";
import Sort from "./Sort";
import View from "./View";

// const Sidebar = (table: TableType<Device>) => {
const Sidebar = () => {
  return (
    <div className="layout-content-container flex flex-col w-[360px]">
      <Actions />
      <Sort />
      <View />
    </div>
  );
};

export default Sidebar;

import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";
import { Table as TableType } from "@tanstack/react-table";

import { Device } from "../../../../types";
import { RootState } from "../../../../store/store";

import FilterChip from "./FieldChip";
import SubFilter from "./FieldSubFilter";
import FilterHandler from "./FilterHandler";
// import FilterToolbar from "./FilterToolbar";

type FilterProps = {
  filters?: string;
  updateFilter?: (key: string, value: string) => void;
  table: TableType<Device>;
};
const Filters: React.FC<FilterProps> = ({ table }) => {
  const [showHelperPanel] = useState(true);
  const [panelLocation] = useState("bottom");
  const { activeSubfilter: subfilter, filterKeys } = useSelector(
    (state: RootState) => state.table.filters
  );

  return (
    <div
      className={twMerge(
        "flex max-w-full gap-4 bg-blue-900",
        panelLocation === "right" ? "flex-row" : "flex-col"
      )}
    >
      {/* <FilterToolbar /> */}
      <div className="p-4 text-white rounded bg-blue-700 overflow-scroll">
        <div className="flex flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <input
              placeholder="Search models"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#FFFFFF] focus:outline-0 focus:ring-0 border border-[#383838] bg-[#242424] focus:border-[#383838] h-14 placeholder:text-[#C4C4C4] p-[15px] text-base font-normal leading-normal"
              value=""
            />
          </label>
        </div>
        <div className="flex gap-3 p-3 overflow-scroll pr-4 bg-yellow-500">
          {filterKeys.map((chip) => (
            <FilterChip
              key={chip}
              type={chip}
              subfilter={subfilter}
              active={subfilter === chip}
            />
          ))}
        </div>
        <div className="h-20 bg-red-600">
          <SubFilter table={table} subfilter={subfilter} />
        </div>
      </div>

      {showHelperPanel ? (
        <div className="p-4 text-white rounded bg-purple-500">
          <FilterHandler />
        </div>
      ) : null}
    </div>
  );
};

export default Filters;

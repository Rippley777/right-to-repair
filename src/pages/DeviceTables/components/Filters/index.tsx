import { useSelector } from "react-redux";
import { Table as TableType } from "@tanstack/react-table";

import { Device } from "../../../../types";
import { RootState } from "../../../../store/store";

import FilterChip from "./FieldChip";
import SubFilter from "./FieldSubFilter";
import FilterHandler from "./FilterHandler";
import FilterToolbar from "./FilterToolbar";
import FilterSearch from "./FilterSearch";
import { twMerge } from "tailwind-merge";

type FilterProps = {
  filters?: string;
  updateFilter?: (key: string, value: string) => void;
  table: TableType<Device>;
};

const Filters: React.FC<FilterProps> = ({ table }) => {
  const devMode = process.env.NODE_ENV === "debug";

  const { activeSubfilter: subfilter, filterKeys } = useSelector(
    (state: RootState) => state.table.filters
  );

  const { search, editFilters } = useSelector(
    (state: RootState) => state.table.features
  );

  return (
    <div>
      <FilterToolbar />

      {/* CHIPS */}
      <div
        className={twMerge(
          "text-white rounded overflow-scroll",
          devMode ? "bg-teal-700" : ""
        )}
      >
        <div
          className={twMerge(
            "flex gap-3 p-3 overflow-scroll pr-4",
            devMode ? "bg-yellow-500" : ""
          )}
        >
          {filterKeys.map((chip) => (
            <FilterChip
              key={chip}
              type={chip}
              subfilter={subfilter}
              active={subfilter === chip}
            />
          ))}
        </div>
      </div>

      {subfilter ? (
        <div
          className={twMerge(
            "h-20 overflow-scroll ",
            devMode ? "bg-red-500" : ""
          )}
        >
          <SubFilter table={table} subfilter={subfilter} />
        </div>
      ) : null}
      {search ? <FilterSearch /> : null}
      {editFilters ? (
        <div
          className={
            (twMerge("p-4 text-white rounded"), devMode ? "bg-purple-500" : "")
          }
        >
          <FilterHandler />
        </div>
      ) : null}
    </div>
  );
};

export default Filters;

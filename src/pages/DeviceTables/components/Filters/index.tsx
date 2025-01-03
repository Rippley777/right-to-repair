import { useSelector } from "react-redux";
import { Table as TableType } from "@tanstack/react-table";

import { Device } from "../../../../types";
import { RootState } from "../../../../store/store";

import SubFilter from "./Field/Subfield";
import FilterHandler from "./Handler";
import FilterSearch from "./Search";
import { twMerge } from "tailwind-merge";
import Field from "./Field";
import useDebugMode from "../../../../hooks/dev/useDebugMode";

type FilterProps = {
  filters?: string;
  updateFilter?: (key: string, value: string) => void;
  table: TableType<Device>;
};

const Filters: React.FC<FilterProps> = ({ table }) => {
  const debugMode = useDebugMode();

  const { activeSubfilter: subfilter } = useSelector(
    (state: RootState) => state.table.filters
  );

  const { search, editFilters } = useSelector(
    (state: RootState) => state.table.features
  );

  return (
    <div>
      {/* Field */}
      <Field />
      {/* SubField */}
      {subfilter ? (
        <div
          className={twMerge(
            "h-20 overflow-scroll ",
            debugMode ? "bg-red-500" : ""
          )}
        >
          <SubFilter table={table} subfilter={subfilter} />
        </div>
      ) : null}

      {/* Search */}

      {search ? <FilterSearch /> : null}

      {/* Handler */}
      {editFilters ? (
        <div
          className={
            (twMerge("p-4 text-white rounded"),
            debugMode ? "bg-purple-500" : "")
          }
        >
          <FilterHandler />
        </div>
      ) : null}
    </div>
  );
};

export default Filters;

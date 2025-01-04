import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { Table as TableType } from "@tanstack/react-table";

import { Device } from "@/types";
import { RootState } from "@/store/store";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

import SubFilter from "./Subfield";
import FilterSearch from "./Search";
import Field from "./FilterFrame";

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

  const { search } = useSelector((state: RootState) => state.table.features);

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
    </div>
  );
};

export default Filters;

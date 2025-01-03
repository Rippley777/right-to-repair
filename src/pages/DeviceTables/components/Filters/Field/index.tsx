import { twMerge } from "tailwind-merge";
import { useSelector } from "react-redux";

import { RootState } from "../../../../../store/store";
import FilterChip from "../components/shared/FieldChip";
import useDebugMode from "../../../../../hooks/dev/useDebugMode";

const Field = () => {
  const { activeSubfilter: subfilter, filterKeys } = useSelector(
    (state: RootState) => state.table.filters
  );
  const debugMode = useDebugMode();

  return (
    <div
      className={twMerge(
        "text-white rounded overflow-scroll",
        debugMode ? "bg-violet-600" : ""
      )}
    >
      <div
        className={twMerge(
          "flex gap-3 p-3 overflow-scroll pr-4",
          debugMode ? "bg-violet-400" : ""
        )}
      >
        {/* TODO maybe check if array */}
        {filterKeys &&
          filterKeys.length > 1 &&
          filterKeys.map((chip) => (
            <FilterChip
              key={chip}
              type={chip}
              subfilter={subfilter}
              active={subfilter === chip}
            />
          ))}
      </div>
    </div>
  );
};

export default Field;

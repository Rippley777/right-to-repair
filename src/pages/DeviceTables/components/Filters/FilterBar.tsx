import { twMerge } from "tailwind-merge";
import FilterChip from "./components/FilterChip";

type FilterBarProps = {
  debugMode: boolean;
  filterKeys: string[];
  subfilter: string | null;
  handleFilterClick: (filter: string) => void;
};

const FilterBar: React.FC<FilterBarProps> = ({
  debugMode,
  filterKeys,
  subfilter,
  handleFilterClick,
}) => {
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
              active={subfilter === chip}
              handleFilterClick={handleFilterClick}
              key={chip}
              subfilter={subfilter}
              type={chip}
            />
          ))}
      </div>
    </div>
  );
};

export default FilterBar;

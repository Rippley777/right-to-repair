import { twMerge } from "tailwind-merge";
import FilterChip from "./components/FilterChip";
import { FilterBarDetailProps } from "../../types";

type FilterBarProps = {
  debugMode: boolean;
  filterKeys: string[];
  handleFilterClick: (filter: string, key: string, level?: number) => void;
  level: number;
  filterBarDetails: FilterBarDetailProps[];
  activeSubfilters?: string[];
};

const FilterBar: React.FC<FilterBarProps> = ({
  debugMode,
  filterKeys,
  handleFilterClick,
  filterBarDetails,
  level,
  activeSubfilters,
}) => {
  if (!filterBarDetails || filterBarDetails.length === 0) return null;
  if (debugMode)
    console.log("Filter Bar rend:", {
      debugMode,
      filterKeys,
      handleFilterClick,
      filterBarDetails,
      level,
      activeSubfilters,
    });

  return (
    <div
      className={twMerge(
        "text-white rounded overflow-scroll h-12",
        debugMode ? "bg-violet-600" : ""
      )}
    >
      <div
        className={twMerge(
          "flex gap-3 p-3 overflow-scroll pr-4",
          debugMode ? "bg-violet-400" : ""
        )}
      >
        {filterBarDetails.map((detailItem) => {
          const isActive = activeSubfilters?.includes(detailItem.key) ?? false;
          // console.log({ isActive });
          return (
            <FilterChip
              active={isActive}
              handleFilterClick={handleFilterClick}
              key={level ? detailItem.key : detailItem.type}
              type={detailItem.key}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FilterBar;

//   <FilterBar
//   debugMode={debugMode}
//   filterKeys={filterKeys}
//   subfilter={parentKey ?? null}
//   parentKey=""
//   level={level + 1}
// >
// </FilterBar>

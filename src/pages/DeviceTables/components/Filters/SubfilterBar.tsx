// TODO share this with filter bar

import { twMerge } from "tailwind-merge";
import FilterChip from "./components/FilterChip";
import { FilterBarDetailProps } from "../../types";
import { FilterTree } from "@/utils/dataUtils";

type SubfilterBarProps = {
  debugMode: boolean;
  filterKeys: string[];
  handleFilterClick: (filter: string, key: string, level?: number) => void;
  level: number;
  filterBarDetails: FilterBarDetailProps[];
  activeSubfilters?: string[];
  filterTree: FilterTree;
};

const SubfilterBar: React.FC<SubfilterBarProps> = ({
  debugMode,
  filterKeys,
  handleFilterClick,
  filterBarDetails = [],
  level,
  activeSubfilters,
  filterTree,
}) => {
  if (!filterBarDetails || filterBarDetails.length === 0) return null;
  if (debugMode)
    console.log("SubFilter Bar rend:", {
      debugMode,
      filterKeys,
      handleFilterClick,
      filterBarDetails,
      level,
      activeSubfilters,
      filterTree,
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
        {filterTree &&
          Object.keys(filterTree).map((filterKey) => {
            const isActive = activeSubfilters?.includes(filterKey) ?? false;
            // console.log({ isActive });
            return (
              <FilterChip
                active={isActive}
                handleFilterClick={handleFilterClick}
                // @ts-expect-error TODO learn typescript lmao
                key={level ? filterKey : filterTree[filterKey].type}
                type={filterKey}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SubfilterBar;

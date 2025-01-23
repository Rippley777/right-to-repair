// TODO share this with filter bar

import { twMerge } from "tailwind-merge";
import FilterChip from "./FilterChip";
import { FilterTree } from "@/utils/dataUtils";

type FilterBarProps = {
  activeSubfilters: string[];
  debugMode: boolean;
  filterData: Record<string, string | number>;
  filterKeys: string[];
  filterTree: FilterTree;
  filterValues: Record<string, (string | number)[]>;
  handleFilterKeyClick: (filter: string, level: number) => void;
  handleFilterValueClick: (filter: string, level: number) => void;
  level?: number;
  workingSubfilters?: string[];
};

const FilterBar: React.FC<FilterBarProps> = ({
  activeSubfilters,
  debugMode,
  filterData,
  filterKeys,
  filterTree,
  filterValues,
  handleFilterKeyClick,
  handleFilterValueClick,
  level = 0,
  // TODO think of a bettery name
  workingSubfilters = activeSubfilters,
}) => {
  if (debugMode)
    console.log("SubFilter Bar2 rend:", {
      level,
      activeSubfilters,
      debugMode,
      filterKeys,
      filterTree,
      filterValues,
      handleFilterKeyClick,
      workingSubfilters,
    });
  if (!filterTree) {
    const filterKey = activeSubfilters
      .filter((value) => value !== "device_details")
      .join(".");
    const sortOptions = filterValues[filterKey];

    if (!sortOptions) {
      return <></>;
    }

    return (
      <div className="flex gap-2 overflow-scroll">
        {sortOptions.map((option: string | number) => {
          return (
            <FilterChip
              level={level}
              active={
                filterData[filterKey]
                  ? typeof filterData[filterKey] === "number"
                    ? filterData[filterKey] === option
                    : filterData[filterKey].includes(option as string)
                  : false
              }
              handleFilterClick={handleFilterValueClick}
              type={`${option}`}
              key={`${option}`}
            />
          );
        })}
      </div>
    );
  }
  return (
    <>
      <FilterRow
        key={level}
        level={level}
        items={Object.keys(filterTree)}
        activeSubfilters={activeSubfilters}
        debugMode={debugMode}
        handleFilterKeyClick={handleFilterKeyClick}
      />
      <FilterBar
        level={level + 1}
        filterKeys={filterKeys}
        filterTree={filterTree[workingSubfilters[0]] as FilterTree}
        filterValues={filterValues}
        activeSubfilters={activeSubfilters}
        filterData={filterData}
        debugMode={debugMode}
        handleFilterKeyClick={handleFilterKeyClick}
        handleFilterValueClick={handleFilterValueClick}
        workingSubfilters={workingSubfilters.slice(1)}
      />
    </>
  );
};

export default FilterBar;

type FilterRowProps = {
  activeSubfilters: string[];
  debugMode: boolean;
  handleFilterKeyClick: (filter: string, level: number) => void;
  items: string[];
  level: number;
};
const FilterRow: React.FC<FilterRowProps> = ({
  activeSubfilters,
  debugMode,
  handleFilterKeyClick,
  items,
  level,
}) => {
  if (debugMode)
    console.log("FilterRow rend:", {
      level,
      items,
      debugMode,
      handleFilterKeyClick,
      activeSubfilters,
    });
  if (!items) return <div>Error: missing items Filter Row</div>;
  return (
    <div>
      <div
        className={twMerge(
          "text-white flex rounded overflow-scroll h-12 gap-2",
          debugMode ? "bg-violet-600" : ""
        )}
      >
        {items.map((filterKey) => {
          const isActive = activeSubfilters[level] === filterKey;
          return (
            <FilterChip
              level={level}
              active={isActive}
              handleFilterClick={handleFilterKeyClick}
              key={filterKey}
              type={filterKey}
            />
          );
        })}
      </div>
    </div>
  );
};

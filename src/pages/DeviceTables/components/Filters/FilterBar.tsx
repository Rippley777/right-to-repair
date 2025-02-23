// TODO share this with filter bar

import { twMerge } from "tailwind-merge";
import FilterChip from "./FilterChip";
import { FilterTree } from "@/utils/dataUtils";
import { logDebug } from "@/utils/logUtils";
import { debugStyle } from "@/utils/styleUtils";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

type FilterBarProps = {
  activeSubfilters: string[];
  filterData: Record<string, string | number>;
  filterKeys: string[];
  filterTree: FilterTree;
  filterValues: Record<string, (string | number)[]>;
  handleFilterKeyClick: (filter: string, level: number) => void;
  handleFilterValueClick: (filter: string, level: number) => void;
  level?: number;
  workingSubfilters?: string[];
};
const excludedValues = ["device_details", "default"];

const FilterBar: React.FC<FilterBarProps> = (props) => {
  const debugMode = useDebugMode();

  const {
    activeSubfilters,
    filterData,
    filterKeys,
    filterTree,
    filterValues,
    handleFilterKeyClick,
    handleFilterValueClick,
    level = 0,
    // TODO think of a bettery name
    workingSubfilters = activeSubfilters,
  } = props;

  logDebug(debugMode, "SubFilter Bar2 rend:", props);
  if (!filterTree) {
    const filterKey = activeSubfilters
      .filter((value) => !excludedValues.includes(value))
      .join(".");
    const sortOptions = filterValues[filterKey];

    if (!sortOptions) {
      return <div>Error: missing options Filter Bar</div>;
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
        debugMode={debugMode}
        key={level}
        level={level}
        items={Object.keys(filterTree)}
        activeSubfilters={activeSubfilters}
        handleFilterKeyClick={handleFilterKeyClick}
      />
      <FilterBar
        level={level + 1}
        filterKeys={filterKeys}
        filterTree={filterTree[workingSubfilters[0]] as FilterTree}
        filterValues={filterValues}
        activeSubfilters={activeSubfilters}
        filterData={filterData}
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

const FilterRow: React.FC<FilterRowProps> = (props) => {
  const {
    activeSubfilters,
    debugMode,
    handleFilterKeyClick,
    items,
    level,
  } = props;
  logDebug(debugMode, "FilterRow rend:", props);
  if (!items) return <div>Error: missing items Filter Row</div>;
  return (
    <div>
      <div
        className={twMerge(
          "text-white flex rounded overflow-scroll h-12 gap-2",
          debugStyle("bg-violet-600")
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

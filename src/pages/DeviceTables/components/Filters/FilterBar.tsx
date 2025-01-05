// TODO share this with filter bar

import { twMerge } from "tailwind-merge";
import FilterChip from "./components/FilterChip";
import { FilterTree } from "@/utils/dataUtils";

type SubfilterBarProps = {
  debugMode: boolean;
  filterValues: Record<string, unknown>;
  filterKeys: string[];
  handleSubfilterClick: (filter: string, level: number) => void;
  activeSubfilters: string[];
  filterTree: FilterTree;
};

const SubfilterBar: React.FC<SubfilterBarProps> = ({
  activeSubfilters,
  debugMode,
  filterKeys,
  filterTree,
  filterValues,
  handleSubfilterClick,
}) => {
  if (debugMode)
    console.log("SubFilter Bar2 rend:", {
      activeSubfilters,
      debugMode,
      filterKeys,
      filterTree,
      handleSubfilterClick,
    });
  if (!filterTree) return null;
  const items =
    activeSubfilters.length === 0 || activeSubfilters[0] === null
      ? Object.keys(filterTree)
      : Object.keys(filterTree);
  return (
    <div
      className={twMerge(
        "text-white flex rounded overflow-scroll h-12",
        debugMode ? "bg-violet-600" : ""
      )}
    >
      {activeSubfilters.map((filter, index) => (
        <FilterRow
          index={index}
          filter={filter}
          filterTree={filterTree}
          filterValues={filterValues}
          items={items}
          activeSubfilters={activeSubfilters}
          debugMode={debugMode}
          handleSubfilterClick={handleSubfilterClick}
        />
      ))}
    </div>
  );
};

export default SubfilterBar;

type FilterRowProps = {
  index: number;
  filter: string;
  items: string[];
  handleSubfilterClick: (filter: string, level: number) => void;
  debugMode: boolean;
  filterTree: FilterTree;
  filterValues: Record<string, unknown>;
  activeSubfilters: string[];
};
const FilterRow: React.FC<FilterRowProps> = ({
  activeSubfilters,
  debugMode,
  handleSubfilterClick,
  index,
  items,
}) => {
  if (debugMode)
    console.log("FilterRow rend:", {
      debugMode,
      handleSubfilterClick,
      activeSubfilters,
    });
  return (
    <div>
      <div
        className={twMerge(
          "text-white flex rounded overflow-scroll h-12",
          debugMode ? "bg-violet-600" : ""
        )}
      >
        {items.map((filterKey) => {
          const isActive = activeSubfilters?.includes(filterKey) ?? false;
          return (
            <FilterChip
              level={index}
              active={isActive}
              handleFilterClick={handleSubfilterClick}
              key={filterKey}
              type={filterKey}
            />
          );
        })}
      </div>
    </div>
  );
};

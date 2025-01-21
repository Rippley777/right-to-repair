import { twMerge } from "tailwind-merge";
import { TbTrash } from "react-icons/tb";

import { flattenNestedObject } from "@/utils/dataUtils";

type ActiveFilterBarProps = {
  filterData: Record<string, string | number>;
  debugMode: boolean;
  handleFilterClick: (filter: string, level: number) => void;
  handleRefresh: () => void;
};

const filtersToSkip = ["page", "pageSize"];

const ActiveFilterBar: React.FC<ActiveFilterBarProps> = ({
  filterData,
  debugMode,
  handleRefresh,
  handleFilterClick,
}) => {
  const allEntries = flattenNestedObject(filterData);
  const filteredChips = allEntries.filter(
    (entry) => !filtersToSkip.includes(entry.key)
  );
  if (debugMode)
    console.log("ActiveFilterBar rend:", { filterData, allEntries });

  return (
    <div
      className={
        (twMerge("p-4 text-white rounded"), debugMode ? "bg-purple-500" : "")
      }
    >
      <div className="flex flex-col gap-2 justify-start">
        <div className="flex flex-1 justify-center items-center gap-2">
          <span className="text-sm">Active Filters</span>
          {Object.keys(filterData).length > 2 ? (
            <TbTrash size={18} onClick={handleRefresh} />
          ) : null}
        </div>

        <div
          className={twMerge(
            "flex flex-wrap gap-2 p-3",
            debugMode ? "bg-rose-400" : ""
          )}
        >
          {filteredChips.map(({ key, value }) => (
            <FilterChip
              onClick={handleFilterClick}
              key={`${key}-${value}`}
              level={-1}
              /*group={key}*/ type={value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActiveFilterBar;

type FilterChipProps = {
  key: string;
  onClick: (type: string, level: number) => void;
  level: number;
  type: string;
};

const FilterChip: React.FC<FilterChipProps> = ({ onClick, type, level }) => {
  return (
    <div
      onClick={() => onClick(type, level)}
      className={twMerge(
        "flex p-3 h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {type}
      </p>
      <TbTrash />
    </div>
  );
};

import { twMerge } from "tailwind-merge";
import { TbTrash } from "react-icons/tb";

import { flattenNestedObject } from "@/utils/dataUtils";

type ActiveFilterBarProps = {
  filterData: Record<string, string | number>;
  debugMode: boolean;
  handleFilterClick: (filter: string, key: string, level?: number) => void;
};

const ActiveFilterBar: React.FC<ActiveFilterBarProps> = ({
  filterData,
  debugMode,
  handleFilterClick,
}) => {
  const allEntries = flattenNestedObject(filterData);
  const filteredChips = allEntries.filter((entry) => entry.key !== "page");
  if (debugMode)
    console.log("ActiveFilterBar rend:", { filterData, allEntries });

  return (
    <div
      className={
        (twMerge("p-4 text-white rounded"), debugMode ? "bg-purple-500" : "")
      }
    >
      <div className="flex flex-col gap-2 justify-start">
        <span className="text-sm">Active Filters</span>

        <div
          className={twMerge("flex gap-2 p-3", debugMode ? "bg-rose-400" : "")}
        >
          {filteredChips.map(({ key, value }) => (
            <FilterChip
              onClick={handleFilterClick}
              key={`${key}-${value}`}
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
  onClick: (type: string, key: string, level?: number) => void;
  level?: number;
  type: string;
};

const FilterChip: React.FC<FilterChipProps> = ({
  key,
  onClick,
  type,
  level,
}) => {
  return (
    <div
      onClick={() => onClick(type, key, level)}
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

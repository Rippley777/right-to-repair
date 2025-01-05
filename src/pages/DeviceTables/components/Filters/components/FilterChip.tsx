import { twMerge } from "tailwind-merge";
import { humanReadableKey } from "@/utils/dataUtils";
import { filterValueMap } from "../utils/filterHelpers";

type FilterChipProps = {
  active: boolean;
  key: string;
  handleFilterClick: (filter: string, key: string, level?: number) => void;
  type: string;
  level?: number;
};

const FilterChip: React.FC<FilterChipProps> = ({
  key,
  type,
  active,
  handleFilterClick,
  level,
}) => {
  const filterChipKey = filterValueMap[type] ?? type;
  return (
    <div
      key={key ?? type}
      onClick={() => handleFilterClick(type, key, level)}
      className={twMerge(
        "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer",
        active ? "bg-[#FF5C00]" : "hover:bg-[#383838] focus:bg-[#383838]"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {filterChipKey ? humanReadableKey(filterChipKey) : null}
      </p>
    </div>
  );
};

export default FilterChip;

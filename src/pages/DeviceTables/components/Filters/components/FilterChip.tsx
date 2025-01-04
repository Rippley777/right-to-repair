import { twMerge } from "tailwind-merge";
import { humanReadableKey } from "@/utils/dataUtils";
import { filterValueMap } from "../utils/filterHelpers";

type FilterChipProps = {
  active: boolean;
  handleFilterClick: (filter: string) => void;
  subfilter: string | null;
  type: string;
  key?: string;
};

const FilterChip: React.FC<FilterChipProps> = ({
  key,
  type,
  active,
  handleFilterClick,
}) => {
  return (
    <div
      key={key ?? type}
      onClick={() => handleFilterClick(type)}
      className={twMerge(
        "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer",
        active ? "bg-[#FF5C00]" : "hover:bg-[#383838] focus:bg-[#383838]"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {humanReadableKey(filterValueMap[type] ?? type)}
      </p>
    </div>
  );
};

export default FilterChip;

import { twMerge } from "tailwind-merge";
import { humanReadableKey } from "@/utils/dataUtils";
import { logDebug } from "@/utils/logUtils";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

type FilterChipProps = {
  active: boolean;
  handleFilterClick: (filter: string, level: number) => void;
  key: string;
  type: string;
  level: number;
};

const FilterChip: React.FC<FilterChipProps> = ({
  active,
  handleFilterClick,
  key = " missing key",
  level,
  type,
}) => {
  const debugMode = useDebugMode();
  logDebug(debugMode, "FilterChip: ", {
    // active,
    // handleFilterClick,
    // key,
    // level,
    // type,
  });
  const filterChipKey = humanReadableKey(type) ?? type;

  const handleFilterChipClick = () => {
    logDebug(debugMode, "FilterChip onClick", { type, key, level });
    handleFilterClick(type, level);
  }

  // TODO get smarter here
  return (
    <div
      // TODO need unique key
      key={key ?? type}
      onClick={handleFilterChipClick}
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

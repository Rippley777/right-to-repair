import { twMerge } from "tailwind-merge";
import FieldChip from "./components/FilterChip";

type SubfilterBarProps = {
  activeSubfilters: string[];
  debugMode: boolean;
  filterData: Record<string, string | number>;
  subfilter: string | null;
  handleFilterClick: (filter: string) => void;
};

const handleDataMatch = (data: unknown, content: string) => {
  if (Array.isArray(data)) {
    return data.includes(content);
  }
  if (typeof data === "string") {
    return data.includes(content);
  }
  if (typeof data === "number") return data == Number(content);

  return data == content;
};
const SubfilterBar: React.FC<SubfilterBarProps> = ({
  activeSubfilters,
  debugMode,
  filterData,
  subfilter,
  handleFilterClick,
}) => {
  return (
    <div
      className={twMerge(
        "h-20 overflow-scroll ",
        debugMode ? "bg-red-500" : ""
      )}
    >
      <div
        className={twMerge(
          "flex gap-3 p-3 flex-wrap pr-4",
          debugMode ? "bg-teal-300" : ""
        )}
      >
        {subfilter &&
          activeSubfilters.map((chip: string) => {
            const isActive = handleDataMatch(filterData[subfilter], chip);
            if (debugMode)
              console.log("subfilter chip rendered: ", {
                chip,
                isActive,
                subFilterData: filterData[subfilter],
                subfilter,
                filterData,
              });
            return (
              <FieldChip
                active={isActive}
                handleFilterClick={handleFilterClick}
                key={chip as string}
                subfilter={subfilter}
                type={chip as string}
              />
            );
          })}
      </div>
    </div>
  );
};

export default SubfilterBar;

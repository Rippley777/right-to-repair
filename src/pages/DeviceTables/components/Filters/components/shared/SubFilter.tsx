import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import { useDebugMode } from "@/hooks/dev/useDevHandlers";
import { RootState } from "@/store/store";
import FieldChip from "./FieldChip";

type DataFieldFilterProps = {
  subfilter: string | null;
};

const DataFieldFilter: React.FC<DataFieldFilterProps> = ({ subfilter }) => {
  const { activeSubfilter, activeSubfilterValues, data } = useSelector(
    (state: RootState) => state.table.filters
  );
  const debugMode = useDebugMode();
  return (
    <div
      className={twMerge(
        "flex gap-3 p-3 flex-wrap pr-4",
        debugMode ? "bg-teal-300" : ""
      )}
    >
      {activeSubfilterValues.map((chip: string) => {
        if (debugMode) console.log("subfilter chip rendered: ", { chip });
        const isActive =
          typeof data[activeSubfilter] === "string"
            ? data[activeSubfilter]?.includes(chip)
            : data[activeSubfilter] == Number(chip);
        return (
          <FieldChip
            key={chip as string}
            type={chip as string}
            subfilter={subfilter}
            active={isActive}
          />
        );
      })}
    </div>
  );
};

export default DataFieldFilter;

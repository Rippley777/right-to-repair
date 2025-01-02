import { Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../../types";
import FieldChip from "./FieldChip";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { twMerge } from "tailwind-merge";

type DataFieldFilterProps = {
  subfilter: string | null;
  table?: TableType<Device>;
  type?: string;
};

// const filterValueMap = {
//   brand: "brand",
//   year: "release_year",
//   repairability: "repairability_score",
//   processor: "hardware_details.processor",
//   memory: "hardware_details.memory",
//   storage: "hardware_details.storage",
//   difficulty: "repair_difficulty",
// };

const DataFieldFilter: React.FC<DataFieldFilterProps> = ({
  subfilter,
  // table,
  // type,
}) => {
  // const [activeSubfilter, setActiveSubfilter] = useState<string>("brand");
  const {
    activeSubfilter,
    activeSubfilterValues /*rangeValues, sortValues*/,
    data,
  } = useSelector((state: RootState) => state.table.filters);
  const devMode = process.env.NODE_ENV === "debug";

  return (
    <div
      className={twMerge(
        "flex gap-3 p-3 flex-wrap pr-4",
        devMode ? "bg-red-500" : ""
      )}
    >
      {activeSubfilterValues.map((chip: string) => {
        console.log({ chip });
        // @ts-expect-error TODO actually learn TS and get fancy here with indexing
        const isActive = data[activeSubfilter]?.includes(chip);
        return (
          <FieldChip
            key={chip as string}
            // TODO handle edge cases for string type/make sure API is locked down to string
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

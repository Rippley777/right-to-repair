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

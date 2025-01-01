import { useState } from "react";
import { RowData, Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../../types";
import FieldChip from "./FieldChip";

type DataFieldFilterProps = {
  subfilter: string | null;
  table: TableType<Device>;
  type: string;
};

const filterValueMap = {
  brand: "brand",
  year: "release_year",
  repairability: "repairability_score",
  processor: "hardware_details.processor",
  memory: "hardware_details.memory",
  storage: "hardware_details.storage",
  difficulty: "repair_difficulty",
};
const getNestedValue = <T,>(obj: T, path: string): unknown => {
  if (!path) {
    return undefined;
  }
  if (!path.includes(".")) {
    return obj[path as keyof T];
  }
  return path.split(".").reduce((acc: unknown, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};
const DataFieldFilter: React.FC<DataFieldFilterProps> = ({
  subfilter,
  table,
  type,
}) => {
  const [activeSubfilter, setActiveSubfilter] = useState<string | null>(null);
  const allFieldValues = (field: string) => {
    console.log({ field });
    return table.getRowModel().rows.map(
      // (row) => row.original[field.toLocaleLowerCase() as keyof Device]
      // (row) => row.original[filterValueMap[field.toLocaleLowerCase()]]
      // TODO all lowercasing should be handled closer to the API call
      (row) =>
        getNestedValue<RowData>(
          row.original,
          filterValueMap[
            field.toLocaleLowerCase() as keyof typeof filterValueMap
          ]
        )
    );
  };

  const nameValues = allFieldValues(type);
  console.log({ nameValues });
  const uniqueNameValues = [...new Set(nameValues)];

  console.log({ uniqueNameValues });

  return (
    <div className="flex gap-3 p-3 flex-wrap pr-4">
      {uniqueNameValues.map((chip) => {
        console.log({ chip });

        return (
          <FieldChip
            key={chip as string}
            onClick={() => setActiveSubfilter(chip as string)}
            // TODO handle edge cases for string type/make sure API is locked down to string
            type={chip as string}
            subfilter={subfilter}
            active={activeSubfilter === chip}
          />
        );
      })}
    </div>
  );
};

export default DataFieldFilter;

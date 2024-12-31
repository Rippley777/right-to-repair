import { Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../../types";

import { useState } from "react";
import FilterChip from "./FieldChip";
import DataFieldFilter from "./FieldFilter";
// const Filters = (table: TableType<Device>) => {

const chips = [
  "Brand",
  "Year",
  "Repairability",
  "Processor",
  "Memory",
  "Storage",
];

const Filters = (table: TableType<Device>) => {
  const [subfilter, setSubfilter] = useState<string | null>(null);
  console.log("filterDataSet: ", { subfilter });
  return (
    <>
      <h3 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Filter
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <input
            placeholder="Search models"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#FFFFFF] focus:outline-0 focus:ring-0 border border-[#383838] bg-[#242424] focus:border-[#383838] h-14 placeholder:text-[#C4C4C4] p-[15px] text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {chips.map((chip) => (
          <FilterChip
            key={chip}
            onClick={() => setSubfilter(chip)}
            type={chip}
            subfilter={subfilter}
            active={subfilter === chip}
          />
        ))}
      </div>
      <div className="h-20">
        <SubFilter table={table} subfilter={subfilter} />
      </div>
    </>
  );
};

export default Filters;

type SubFilterProps = {
  table: TableType<Device>;
  subfilter: string | null;
  // setSubfilter: (subfilter: string) => void;
};
const SubFilter: React.FC<SubFilterProps> = ({ table, subfilter }) => {
  switch (subfilter?.toLowerCase()) {
    case "brand":
      console.log("inbrand");

      return (
        <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
      );
      break;
    case "year":
      return (
        <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
      );
      break;
    case "repairability":
      return (
        <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
      );
      break;
    case "processor":
      return (
        <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
      );
      break;
    case "memory":
      return (
        <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
      );
      break;
    case "storage":
      return (
        <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
      );
      break;
    default:
      return null;
  }
  return <div className="h-20"></div>;
};

import { useSelector } from "react-redux";
import { Table as TableType } from "@tanstack/react-table";

import { RootState } from "../../../../store/store";
import { Device } from "../../../../types";

import DataFieldFilter from "./FieldFilter";

type SubFilterProps = {
  table: TableType<Device>;
  subfilter: string | null;
};

const SubFilter: React.FC<SubFilterProps> = ({ table, subfilter }) => {
  const {
    filterValues,
    rangeValues,
    sortValues,
    fetchingFilterOptions,
    error,
  } = useSelector((state: RootState) => state.table.filters);

  if (fetchingFilterOptions) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!subfilter) {
    return null;
  }

  if (filterValues[subfilter]) {
    return (
      <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
    );
  }

  if (rangeValues[subfilter]) {
    return (
      <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
    );
  }

  if (sortValues[subfilter]) {
    return (
      <DataFieldFilter subfilter={subfilter} type={subfilter} table={table} />
    );
  }

  return null;
};

export default SubFilter;

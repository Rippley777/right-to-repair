import { useSelector } from "react-redux";
import { Table as TableType } from "@tanstack/react-table";

import { RootState } from "@/store/store";
import { Device } from "@/types";

import SubFilterRow from "../components/shared/SubFilter";

type SubFilterProps = {
  table: TableType<Device>;
  subfilter: string | null;
};

const SubFilter: React.FC<SubFilterProps> = ({ subfilter }) => {
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
    return <SubFilterRow subfilter={subfilter} />;
  }

  if (rangeValues[subfilter]) {
    return <SubFilterRow subfilter={subfilter} />;
  }

  if (sortValues[subfilter]) {
    return <SubFilterRow subfilter={subfilter} />;
  }

  return null;
};

export default SubFilter;

import { Table as TableType } from "@tanstack/react-table";
import { Device } from "../../../../types";

type DataFieldFilterProps = {
  table: TableType<Device>;
  type: string;
};

const DataFieldFilter: React.FC<DataFieldFilterProps> = ({ table, type }) => {
  const allFieldValues = (field: string) => {
    return table
      .getRowModel()
      .rows.map((row) => row.original[field as keyof Device]);
  };

  const nameValues = allFieldValues(type);
  const uniqueNameValues = [...new Set(nameValues)];
  console.log({ uniqueNameValues });
  return <div>test</div>;
};

export default DataFieldFilter;

import { useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";

import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { Device } from "../../../types";
import { useDevices } from "../../../hooks/useDevices";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (
      rowIndex: number,
      columnId: keyof TData,
      value: unknown
    ) => void;
  }
  // @ts-expect-error no-unused-vars
  interface ColumnMeta {
    filterVariant?: "text" | "range" | "select";
  }
}

const TableFrame = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const { devices } = useDevices();

  const columns = useMemo<ColumnDef<Device>[]>(
    () => [
      {
        header: "Model Details",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "release_year",
            header: "Year",
            footer: (props) => props.column.id,
            sortDescFirst: true,
          },
          {
            accessorKey: "model_identifier",
            header: "Model",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "model_number",
            header: "Model Number",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "brand",
            header: "Brand",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "type",
            header: "Type",
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Repairability",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "repairability_score",
            header: "Score",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "repair_difficulty",
            header: "Difficulty",
            footer: (props) => props.column.id,
          },
          //   {
          //     accessorKey: "known_issues",
          //     header: "Issues",
          //     cell: ({ getValue }) => (
          //       <ul>
          //         {(getValue() as string[]).map((issue, idx) => (
          //           <li key={idx}>{issue}</li>
          //         ))}
          //       </ul>
          //     ),
          //     footer: (props) => props.column.id,
          //   },
        ],
      },
      {
        header: "Hardware Details",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "hardware_details.memory",
            header: "Memory",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "hardware_details.processor",
            header: "Processor",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "hardware_details.gpu_model",
            header: "GPU Model",
            footer: (props) => props.column.id,
          },
        ],
      },
      {
        header: "Repair Insights",
        footer: (props) => props.column.id,
        columns: [
          {
            accessorKey: "repairability_insights.battery",
            header: "Battery Info",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "repairability_insights.tools_required",
            header: "Tools",
            footer: (props) => props.column.id,
          },
          {
            accessorKey: "repairability_insights.cooling_system",
            header: "Cooling",
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
    []
  );

  const table = useReactTable({
    data: devices,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        console.log({ rowIndex, columnId, value });
        return value;
      },
    },
  });
  return (
    <div className="gap-1 px-0 flex flex-1 justify-around py-5">
      <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
        {/* <Header /> */}
        <Filters table={table} />
        <Table {...table} />
      </div>
      <Sidebar />
    </div>
  );
};

export default TableFrame;

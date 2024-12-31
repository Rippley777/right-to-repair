import React, { useMemo } from "react";
import { Device } from "../../types";
import {
  //   Column,
  //   Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  RowData,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  ColumnFiltersState,
} from "@tanstack/react-table";
// import { EditableCell } from "./components/EditableCell";
import useDevices from "../../hooks/useDevices";
import "./table.css";
import Table from "./components/Table";
import Filters from "./components/Filters";
import HomeHeaderSection from "../Home/components/header";
import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

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

function App() {
  const { devices: data, error, status } = useDevices();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
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
    data,
    columns,
    // defaultColumn,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), //client-side filtering
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues(),

    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    // getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...row,
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
        console.log({ rowIndex, columnId, value });
        return value;
      },
    },
  });
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="relative flex size-full min-h-screen w-screen flex-col bg-[#141414] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <HomeHeaderSection />
        <div className="gap-1 px-0 flex flex-1 justify-around py-5">
          <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
            {/* <Header /> */}
            <Filters {...table} />
            <Table {...table} />
          </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useMemo } from "react";
import { Device } from "../../types/";
import {
  //   Column,
  //   Table,
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
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
// Define the type for the data
// type Device = {
//   _id: string;
//   model_number: string;
//   brand: string;
//   type: string;
//   repairability_score: number;
//   repair_difficulty: string;
//   known_issues: string[];
//   hardware_details: {
//     memory: string;
//     processor: string;
//     gpu_model: string;
//   };
//   repairability_insights: {
//     battery: string;
//     tools_required: string;
//     cooling_system: string;
//   };
// };
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

// const defaultColumn: Partial<ColumnDef<Device>> = {
//   cell: (cellContext) => {
//     console.log({ cellContext });

//     <EditableCell {...cellContext} />;
//   },
// };

// Define the column structure

// App Component
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
  console.log("what are these header groups?: ", table.getHeaderGroups());

  return (
    <div className="p-4">
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="border border-gray-300 p-2 text-left"
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border border-gray-300 p-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getPaginationRowModel,
  getSortedRowModel,
  RowData,
  useReactTable,
} from "@tanstack/react-table";

import { useDevices } from "../../../hooks/useDevices";
import { AppDispatch } from "../../../store/store";
import { fetchFilterOptions } from "../../../store/reducers/table/filter";
import { Device } from "../../../types";

import Filters from "../components/Filters";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";

import { useDynamicColumns } from "./getColumns";

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
  const columns = useDynamicColumns();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  const { devices } = useDevices();

  const table = useReactTable<Device>({
    data: devices,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    manualFiltering: true,
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
    meta: {
      updateData: (
        rowIndex: number,
        columnId: string | number,
        value: unknown
      ) => {
        console.log({ rowIndex, columnId, value });
        return value;
      },
    },
  });

  console.log("table: ", table.getAllColumns());
  return (
    <div className="gap-1 px-0 flex flex-1 justify-around py-5">
      <Sidebar table={table} />
      <div className="layout-content-container flex flex-col max-w-[920px] flex-1">
        {/* <Header /> */}
        <Filters table={table} />
        <Table {...table} />
      </div>
    </div>
  );
};

export default TableFrame;

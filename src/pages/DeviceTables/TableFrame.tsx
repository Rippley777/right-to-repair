import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ColumnDef,
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

import { useDevices } from "@/hooks/useDevices";
import { AppDispatch, RootState } from "@/store/store";
import { resetFilters, setFilter } from "@/store/reducers/table/filter";

import {
  toggleInstantSearch,
  toggleActionsExpanded,
  toggleColumnsExpanded,
  toggleSortExpanded,
  toggleSearch,
} from "@/store/reducers/table/features";

import { Device } from "@/types";

import Filters from "./components/Filters";
import Sidebar from "./components/Sidebar";
import Table from "./components/Table";

import { useDynamicColumns } from "./getColumns";
import { fetchDevices } from "@/store/reducers/devices";
import { twMerge } from "tailwind-merge";
import Pagination from "./components/Pagination";
import { setActiveSubfilters } from "@/store/reducers/table/subfilters";
import { FilterTree } from "@/utils/dataUtils";
import { setPage } from "@/store/reducers/table/pages";
import { logDebug } from "@/utils/logUtils";
import { debugStyle } from "@/utils/styleUtils";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

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
  const columns = useDynamicColumns() as ColumnDef<Device, unknown>[];
  const dispatch: AppDispatch = useDispatch();

  const {
    filterKeys,
    filterValues,
    filterTree,
    data: filterData,
  } = useSelector((state: RootState) => state.table.filters);

  const {
    actionsExpanded,
    columnsExpanded,
    instantSearch,
    search,
    sortExpanded,
  } = useSelector((state: RootState) => state.table.features);
  const { activeSubfilters = [] } = useSelector(
    (state: RootState) => state.table.subfilters
  );
  const { devices } = useDevices();
  const { current: currentPage, total: totalPages } = useSelector(
    (state: RootState) => state.table.pages
  );

  const debugMode = useDebugMode();

  /*
   * Start callbacks all components within TableFrame
   *
   */
  const handleUpdate = () => {
    dispatch(fetchDevices({}));
  };

  const handleSearch = () => {
    dispatch(toggleSearch());
  };

  const handleRefresh = () => {
    dispatch(resetFilters());
    dispatch(fetchDevices({}));
  };

  const handleInstantSearchToggle = () => {
    dispatch(toggleInstantSearch());
  };

  const handleSidebarExpandActionClick = () => {
    dispatch(toggleActionsExpanded());
  };
  const handleSidebarExpandColumnsClick = () => {
    dispatch(toggleColumnsExpanded());
  };
  const handleSidebarExpandSortClick = () => {
    dispatch(toggleSortExpanded());
  };
  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    dispatch(fetchDevices({}));
  };

  const handleFilterValueClick = (type: string, level: number = 0) => {
    logDebug(debugMode, "handleFilterValueClick", { type, level });

    const filterKey = activeSubfilters
      .filter((value) => value !== "device_details")
      .join(".");

    dispatch(setFilter({ key: filterKey, value: type }));

    if (instantSearch) {
      dispatch(fetchDevices({}));
    }
    return;
  };

  const handleFilterKeyClick = (type: string, level: number = 0) => {
    logDebug(debugMode, "handleFilterKeyClick", { type, level });
    // 🐉 watch out here 🐉
    const test = activeSubfilters.slice(0, level);
    if (activeSubfilters[activeSubfilters.length - 1] === type) {
      return dispatch(setActiveSubfilters(test));
    }
    test[level] = type;
    dispatch(setActiveSubfilters(test));

    return;
  };

  // const handleRemoveFilterValueClick
  /*
   * Start table logic
   *
   */

  const table = useReactTable<Device>({
    data: devices,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
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
        logDebug(debugMode, 'updateData: ', { rowIndex, columnId, value });
        return value;
      },
    },
  });

  if (!devices) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={twMerge(
        "gap-1 grid grid-cols-4 grid-rows-8 px-0 py-5 w-screen max-w-screen",
        debugStyle("bg-indigo-900")
      )}
    >
      <div
        className={twMerge(
          "col-span-1 row-span-8",
          debugStyle("bg-indigo-800")
        )}
      >
        <Sidebar
          actionsExpanded={actionsExpanded}
          columnsExpanded={columnsExpanded}
          filterData={filterData}
          filterTree={filterTree as FilterTree}
          handleFilterValueClick={handleFilterValueClick}
          handleInstantSearchToggle={handleInstantSearchToggle}
          handleRefresh={handleRefresh}
          handleSearch={handleSearch}
          handleSidebarExpandActionClick={handleSidebarExpandActionClick}
          handleSidebarExpandColumnsClick={handleSidebarExpandColumnsClick}
          handleSidebarExpandSortClick={handleSidebarExpandSortClick}
          handleUpdate={handleUpdate}
          instantSearch={instantSearch}
          sortExpanded={sortExpanded}
        />
      </div>
      <div
        className={twMerge(
          "col-span-3 row-span-8",
          debugStyle("bg-indigo-700")
        )}
      >
        <Filters
          activeSubfilters={activeSubfilters}
          filterData={filterData}
          filterKeys={filterKeys}
          filterTree={filterTree as FilterTree}
          filterValues={filterValues}
          handleFilterKeyClick={handleFilterKeyClick}
          handleFilterValueClick={handleFilterValueClick}
          search={search}
        />
        <Table {...table} />
        <Pagination
          onChange={handlePageChange}
          page={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default TableFrame;

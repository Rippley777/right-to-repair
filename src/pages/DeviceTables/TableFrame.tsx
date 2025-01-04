import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

import { useDevices } from "@/hooks/useDevices";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";
import { AppDispatch, RootState } from "@/store/store";
import {
  fetchFilterOptions,
  resetFilters,
  setActiveSubfilter,
  setFilter,
} from "@/store/reducers/table/filter";

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
  const [sidebarWidth] = useState(400);

  const {
    activeSubfilter,
    filterKeys,
    filterTree,
    filterValues,
    activeSubfilterValues,
    data: filterData,
  } = useSelector((state: RootState) => state.table.filters);

  const {
    actionsExpanded,
    columnsExpanded,
    instantSearch,
    search,
    sortExpanded,
  } = useSelector((state: RootState) => state.table.features);
  const debugMode = useDebugMode();

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

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
  const handleFilterClick = (type: string) => {
    if (filterValues[type] === undefined) {
      dispatch(setFilter({ key: activeSubfilter, value: type }));
      if (instantSearch) {
        dispatch(fetchDevices({}));
      }
      return;
    }
    dispatch(setActiveSubfilter(type));
  };
  // const handleFilterClick = (type: string) => {
  //   if (filterValues[type] === undefined) {
  //     dispatch(removeFilter({ key: activeSubfilter, value: type }));
  //     return;
  //   }
  //   dispatch(setActiveSubfilter(type));
  // };
  const { devices } = useDevices();

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
        if (debugMode) console.log({ rowIndex, columnId, value });
        return value;
      },
    },
  });

  return (
    <div className="gap-1 flex px-0  justify-around py-5">
      <div className={`width-[${sidebarWidth}px] h-full`}>
        <Sidebar
          columnsExpanded={columnsExpanded}
          debugMode={debugMode}
          filterData={filterData}
          filterTree={filterTree}
          sortExpanded={sortExpanded}
          instantSearch={instantSearch}
          actionsExpanded={actionsExpanded}
          handleRefresh={handleRefresh}
          handleSearch={handleSearch}
          handleUpdate={handleUpdate}
          handleFilterClick={handleFilterClick}
          handleInstantSearchToggle={handleInstantSearchToggle}
          handleSidebarExpandActionClick={handleSidebarExpandActionClick}
          handleSidebarExpandColumnsClick={handleSidebarExpandColumnsClick}
          handleSidebarExpandSortClick={handleSidebarExpandSortClick}
        />
      </div>
      <div className="flex flex-col max-w-[920px] flex-1">
        <Filters
          debugMode={debugMode}
          activeSubfilter={activeSubfilter}
          filterKeys={filterKeys}
          activeSubfilters={activeSubfilterValues}
          filterData={filterData}
          search={search}
          subfilter={activeSubfilter}
          handleFilterClick={handleFilterClick}
        />
        <Table {...table} />
      </div>
    </div>
  );
};

export default TableFrame;

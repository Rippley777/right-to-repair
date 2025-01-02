import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ColumnDef } from "@tanstack/react-table";
import { RootState } from "../../../store/store";

type Device = {
  [key: string]: Device;
};

export const useDynamicColumns = () => {
  // Retrieve column visibility or definitions from Redux store
  const visibilityStatus = useSelector(
    (state: RootState) => state.table.columns.visibilityStatus
  );

  const columns = useMemo<ColumnDef<Device, string>[]>(() => {
    const allColumns: ColumnDef<Device>[] = [
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
            // visible: false,
          },
        ],
      },
    ];

    // const filteredColumns = allColumns.map((group) => ({
    //   ...group,
    //   columns: group.columns.filter((col) =>
    //     visibleColumns.includes(col.accessorKey as string)
    //   ),
    // }));

    // const filteredColumns = allColumns.map((group) => ({
    //   ...group,
    //   columns: group.columns.filter(
    //     (col) => visibilityStatus[col.accessorKey as string]
    //   ),
    // }));
    const filteredColumns = allColumns.map(
      (group: ColumnDef<Device, string>) => ({
        ...group,
        // @ts-expect-error - TS doesn't recognize columns on ColumnDef
        columns: group.columns.filter(
          // @ts-expect-error - TS doesn't like col being typed as string
          (col) => visibilityStatus[col.header as string]
        ),
      })
    );
    console.log({ filteredColumns, allColumns });

    return filteredColumns.filter((group) => group.columns.length > 0);
  }, [visibilityStatus]);

  return columns;
};

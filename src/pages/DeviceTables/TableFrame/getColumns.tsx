import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  buildTree,
  humanReadableKey,
  NestedRecord,
} from "../../../utils/dataUtils";

export const useDynamicColumns = () => {
  const { filterKeys, sortKeys } = useSelector(
    (state: RootState) => state.table.filters
  );
  const { visibilityStatus } = useSelector(
    (state: RootState) => state.table.columns
  );

  type ColumnDef<T> = {
    header: string;
    footer: (props: { column: { id: string } }) => string;
    columns?: ColumnDef<T>[];
    accessorKey?: string;
    sortDescFirst?: boolean;
    onHeaderClick?: () => void;
  };

  function generateColumnsFromSchema<T>(schema: string[]): ColumnDef<T>[] {
    if (!filterKeys || filterKeys.length === 0) {
      return [
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
      ];
    }

    const treeToColumns = (
      tree: Record<string, NestedRecord | null>,
      prefix = ""
    ): ColumnDef<T>[] => {
      return Object.entries(tree).map(([key, value]) => {
        const accessorKey = prefix ? `${prefix}.${key}` : key;
        if (value === null) {
          return {
            accessorKey,
            header: humanReadableKey(key),
            footer: (props) => props.column.id,
          };
        } else {
          return {
            header: humanReadableKey(key),
            footer: (props) => props.column.id,
            columns:
              typeof value === "string"
                ? []
                : treeToColumns(value, accessorKey),
          };
        }
      });
    };
    const tree = buildTree(schema);
    return treeToColumns(tree);
  }

  const allColumns = generateColumnsFromSchema(filterKeys);

  const filteredColumns = allColumns?.filter((column) => {
    console.log({
      column,
      visibilityStatus,
      // @ts-expect-error TODO learn typescript lmao
      test: visibilityStatus[column.accessorKey ?? column.header],
    });

    // @ts-expect-error TODO learn typescript lmao
    return !!visibilityStatus[column.accessorKey ?? column.header];
  });

  console.log(filteredColumns);

  return (
    filteredColumns ?? [
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
    ]
  );
};

import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
interface NestedRecord {
  [key: string]: NestedRecord | null;
}

export const useDynamicColumns = () => {
  const { filterKeys } = useSelector((state: RootState) => state.table.filters);
  const { visibilityStatus } = useSelector(
    (state: RootState) => state.table.columns
  );

  type ColumnDef<T> = {
    header: string;
    footer: (props: { column: { id: string } }) => string;
    columns?: ColumnDef<T>[];
    accessorKey?: string;
    sortDescFirst?: boolean;
  };

  function generateColumnsFromSchema<T>(schema: string[]): ColumnDef<T>[] {
    const buildTree = (keys: string[]) => {
      const tree: Record<string, NestedRecord | null> = {};
      keys.forEach((key) => {
        const parts = key.split(".");
        let current = tree;
        parts.forEach((part, index) => {
          if (!current[part]) {
            current[part] = index === parts.length - 1 ? null : {};
          }
          current = current[part] as Record<string, NestedRecord | null>;
        });
      });
      return tree;
    };

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
            header:
              key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
            footer: (props) => props.column.id,
          };
        } else {
          return {
            header:
              key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
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
    // @ts-expect-error TODO learn typescript lmao
    return visibilityStatus[column.header] === false ? false : true;
  });

  return filteredColumns ?? [];
};

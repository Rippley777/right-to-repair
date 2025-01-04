import { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TbChevronDown,
  TbChevronRight,
  TbHexagon,
  TbHexagonFilled,
} from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { Table as TableType } from "@tanstack/react-table";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";
import { RootState } from "@/store/store";
import { toggleVisibility } from "@/store/reducers/table/columns";
import { toggleColumnsExpanded } from "@/store/reducers/table/features";
import { Device } from "@/types";
import { humanReadableKey } from "@/utils/dataUtils";

type ColumnProps = {
  table: TableType<Device>;
};

const Columns: React.FC<ColumnProps> = ({ table }) => {
  const dispatch = useDispatch();
  const { columnsExpanded } = useSelector(
    (state: RootState) => state.table.features
  );
  const { filterTree } = useSelector((state: RootState) => state.table.filters);
  console.log({ table });

  console.log({ filterTree });

  const handleContainerClick = () => {
    dispatch(toggleColumnsExpanded());
  };

  return (
    <div className="text-center">
      <h3
        onClick={handleContainerClick}
        className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
      >
        Columns
        {columnsExpanded ? (
          <TbChevronDown className="inline" />
        ) : (
          <TbChevronRight className="inline" />
        )}
      </h3>
      {columnsExpanded && filterTree
        ? Object.keys(filterTree).map((filter) => {
            return (
              <SubColumnFilter
                filter={filter}
                // @ts-expect-error TODO learn typescrip t
                data={filterTree[filter]}
                level={1}
              />
            );
          })
        : null}
    </div>
  );
};

export default Columns;

type SubColumnFilterProps = {
  filter: string;
  data: unknown;
  level: number;
};
const SubColumnFilter: React.FC<SubColumnFilterProps> = ({
  filter,
  data,
  level,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { visibilityStatus } = useSelector(
    (state: RootState) => state.table.columns
  );
  const isDebugMode = useDebugMode();
  const handleOnSelectionClick: MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    dispatch(toggleVisibility(filter));
  };

  const handleOnExpandClick = () => {
    if (isDebugMode) console.log("SubColumnFilter expand click", { data });

    if (!data) {
      dispatch(toggleVisibility(filter));
    }
    setExpanded(!expanded);
  };
  console.log({ filter, data, level });

  const iconSizeMap: { [key: number]: number } = {
    1: 16,
    2: 12,
    3: 8,
    4: 6,
  };

  const textSizeMap: { [key: number]: string } = {
    1: "text-md",
    2: "text-sm",
    3: "text-xs",
    4: "text-xs",
  };

  // const isLeaf = !data;

  return (
    <div key={filter} className="bg-[#242424] px-4 py-2 text-left">
      <span
        onClick={handleOnExpandClick}
        className={twMerge("border-black cursor-pointer", textSizeMap[level])}
      >
        {/* @ts-expect-error TODO learn typescript */}
        {visibilityStatus[filter] ? (
          <TbHexagonFilled
            onClick={handleOnSelectionClick}
            className="inline mr-2"
            size={iconSizeMap[level]}
          />
        ) : (
          <TbHexagon
            onClick={handleOnSelectionClick}
            className="inline mr-2"
            size={iconSizeMap[level]}
          />
        )}
        {humanReadableKey(filter)}
        {data ? (
          expanded ? (
            <TbChevronDown className="inline" />
          ) : (
            <TbChevronRight className="inline" />
          )
        ) : null}
      </span>
      {expanded && data
        ? Object.keys(data).map((subFilterKey) => {
            if (isDebugMode)
              console.log("SubFilterRendered with key: ", { subFilterKey });
            return (
              <SubColumnFilter
                filter={subFilterKey}
                data={null}
                level={level + 1}
              />
            );
          })
        : null}
    </div>
  );
};
// const subColumns = () => {
//   return (

//     <div key={headerGroup.id} className="bg-[#242424]">
//     {headerGroup.headers.map((header) => (
//       <span key={header.id} className="border-black">
//         {header.isPlaceholder
//           ? null
//           : flexRender(
//               header.column.columnDef.header,
//               header.getContext()
//             )}
//       </span>
//     ))}
//   </div>
//   )
// }

// (
//   <div key={header.id} className="bg-[#242424]">
//     <span className="border-black">
//       {flexRender(
//         header.column.columnDef.header,
//         header.getContext()
//       )}
//     </span>
//   </div>
// )

import { Table as TableType } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
// import { toggleVisibility } from "../../../../store/reducers/table/columns";
import { RootState } from "../../../../store/store";
import { toggleColumnsExpanded } from "../../../../store/reducers/table/features";
import {
  TbChevronDown,
  TbChevronRight,
  TbHexagon,
  TbHexagonFilled,
} from "react-icons/tb";
import { Device } from "../../../../types";
import { MouseEventHandler, useState } from "react";
import { humanReadableKey } from "../../../../utils/dataUtils";
import { toggleVisibility } from "../../../../store/reducers/table/columns";

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

  const handleOnSelectionClick: MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    dispatch(toggleVisibility(filter));
  };

  const handleOnExpandClick = () => {
    console.log({ data });

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

  return (
    <div key={filter} className="bg-[#242424] px-4 py-2 text-left">
      <span
        onClick={handleOnExpandClick}
        className="border-black cursor-pointer"
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
            console.log({ subFilterKey });
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

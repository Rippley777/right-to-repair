import { Table as TableType } from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
// import { toggleVisibility } from "../../../../store/reducers/table/columns";
import { RootState } from "../../../../store/store";
import { toggleColumnsExpanded } from "../../../../store/reducers/table/features";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import { Device } from "../../../../types";
import { useState } from "react";
import { humanReadableKey } from "../../../../utils/dataUtils";
import { TbBorderCorners, TbCheckbox } from "react-icons/tb";

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
    <div className="text-left">
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
              // @ts-expect-error TODO learn typescript
              <SubColumnFilter filter={filter} data={filterTree[filter]} />
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
};
const SubColumnFilter: React.FC<SubColumnFilterProps> = ({ filter, data }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div key={filter} className="bg-[#242424]">
      <span onClick={() => setExpanded(!expanded)} className="border-black">
        {true ? <TbCheckbox className="inline" /> : <TbBorderCorners />}

        {humanReadableKey(filter)}
      </span>
      {expanded && Array.isArray(data)
        ? data.map((filter) => {
            return <SubColumnFilter filter={filter} data={data[filter]} />;
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

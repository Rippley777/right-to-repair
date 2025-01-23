import { MouseEventHandler, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TbChevronDown,
  TbChevronRight,
  TbHexagon,
  TbHexagonFilled,
} from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";
import { RootState } from "@/store/store";
import { toggleVisibility } from "@/store/reducers/table/columns";
import { FilterTree, humanReadableKey } from "@/utils/dataUtils";

type ColumnsProps = {
  columnsExpanded: boolean;
  handleExpandClick: () => void;
  filterTree: unknown;
  workingColumns?: string[];
};
const Columns: React.FC<ColumnsProps> = ({
  columnsExpanded,
  handleExpandClick,
  filterTree,
  // workingColumns,
}) => {
  return (
    <div className="text-center">
      <h3
        onClick={handleExpandClick}
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
                // data={filterTree[filter]}
                data={filterTree[workingSubfilters[0]] as FilterTree}
                level={1}
                // workingColumns={filterTree.slice(1)}
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
  data: FilterTree;
  level: number;
  // workingColumns: string[];
};
const SubColumnFilter: React.FC<SubColumnFilterProps> = ({
  filter,
  data,
  level,
  // workingColumns,
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
  if (isDebugMode)
    console.log("SubColumnFilter rend: ', { filter, data, level }");

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
        {filter && humanReadableKey(filter)}
        {data ? (
          expanded ? (
            <TbChevronDown className="inline" />
          ) : (
            <TbChevronRight className="inline" />
          )
        ) : null}
      </span>
      {expanded && data
        ? Object.keys(data).map((subfilterKey) => {
            if (isDebugMode)
              console.log("SubfilterRendered with key: ", { subfilterKey });
            return (
              <SubColumnFilter
                filter={subfilterKey}
                // filterKey={}
                data={data[subfilterKey]}
                // workingColumns={workingColumns.slice(1)}
                level={level + 1}
              />
            );
          })
        : null}
    </div>
  );
};

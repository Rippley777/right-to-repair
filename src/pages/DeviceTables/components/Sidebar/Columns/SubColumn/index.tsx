
import { MouseEventHandler, useState } from "react";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { toggleVisibility } from "@/store/reducers/table/columns";
import { RootState } from "@/store/store";
import { FilterTree, humanReadableKey } from "@/utils/dataUtils";
import Icon from "./IndicatorIcon";
import { iconSizeMap, textSizeMap } from "../../utils";
import { logDebug } from "@/utils/logUtils";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

type SubColumnProps = {
  filter: string;
  data: FilterTree;
  level: number;
};

const SubColumn: React.FC<SubColumnProps> = ({
  filter,
  data,
  level,
}) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const { visibilityStatus } = useSelector(
    (state: RootState) => state.table.columns
  );
  const debugMode = useDebugMode();

  const handleOnSelectionClick: MouseEventHandler<SVGElement> = (e) => {
    e.stopPropagation();
    dispatch(toggleVisibility(filter));
  };

  const handleOnExpandClick = () => {
    logDebug(debugMode, "SubColumn expand click", { data });

    if (!data) {
      dispatch(toggleVisibility(filter));
    }

    setExpanded(!expanded);
  };

  logDebug(debugMode, "SubColumn rend: ", { filter, data, level });

  // const isLeaf = !data;

  const ExpandIcon = ({ expanded }: { expanded: boolean }) => (
    expanded ? <TbChevronDown className="inline" /> : <TbChevronRight className="inline" />
  );

  const SubfilterList = ({ data, level }: { data: FilterTree; level: number }) => (
    <>
      {Object.keys(data).map((subfilterKey) => {
        logDebug(debugMode, "SubfilterRendered with key: ", { subfilterKey });
        return <SubColumn filter={subfilterKey} data={data[subfilterKey] as FilterTree} level={level + 1} />;
      })}
    </>
  );

  return (
    <div key={filter} className="bg-[#242424] px-4 py-2 text-left">
      <span
        onClick={handleOnExpandClick}
        className={twMerge("border-black cursor-pointer", textSizeMap[level])}
      >
        {/* @ts-expect-error TODO learn typescript */}
        <Icon isVisible={visibilityStatus[filter]} onClick={handleOnSelectionClick} size={iconSizeMap[level]} />
        {filter && humanReadableKey(filter)}
        {data && <ExpandIcon expanded={expanded} />}
      </span>
      {expanded && data && <SubfilterList data={data} level={level} />}
    </div>
  );
}

export default SubColumn;

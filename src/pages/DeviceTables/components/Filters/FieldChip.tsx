import { twMerge } from "tailwind-merge";
import { filterValueMap } from "./utils/filterHelpers";
import { useDispatch, useSelector } from "react-redux";
import {
  // fetchFilterOptions,
  setActiveSubfilter,
  setFilter,
} from "../../../../store/reducers/table/filter";
import { AppDispatch, RootState } from "../../../../store/store";

type FilterChipProps = {
  key?: string;
  onClick?: (type: string) => void;
  type: string;
  subfilter: string | null;
  active: boolean;
};
const FilterChip: React.FC<FilterChipProps> = ({
  key,
  // onClick,
  type,
  active,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { activeSubfilter, filterValues } = useSelector(
    (state: RootState) => state.table.filters
  );

  // useEffect(() => {
  //   dsispatch(fetchFilterOptions())));
  // }, []);
  const handleFilterClick = () => {
    if (filterValues[type] === undefined) {
      dispatch(setFilter({ key: activeSubfilter, value: type }));
      return;
    }
    dispatch(setActiveSubfilter(type));
  };
  return (
    <div
      key={key ?? type}
      // onClick={onClick as unknown as () => void}
      onClick={handleFilterClick}
      className={twMerge(
        "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer",
        active ? "bg-[#FF5C00]" : "hover:bg-[#383838] focus:bg-[#383838]"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {filterValueMap[type] ?? type}
      </p>
    </div>
  );
};

export default FilterChip;

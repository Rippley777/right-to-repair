import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

import { RootState } from "../../../../store/store";

const FilterHandler = () => {
  const { data } = useSelector((state: RootState) => state.table.filters);
  const allValues = Object.values(data)
    .flat()
    .filter((value) => value !== undefined && value !== null);

  return (
    <div className="bg-purple-300 flex gap-2">
      {allValues.map((filter) => {
        return <FilterChip key={filter} type={filter} />;
      })}
    </div>
  );
};

export default FilterHandler;

type FilterChipProps = {
  key?: string | number;
  type: string | number;
};

const FilterChip: React.FC<FilterChipProps> = ({ type }) => {
  return (
    <div
      className={twMerge(
        "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {type}
      </p>
    </div>
  );
};

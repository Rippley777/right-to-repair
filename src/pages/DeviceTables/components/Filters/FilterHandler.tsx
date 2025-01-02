import { useDispatch, useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";
import { TbTrash } from "react-icons/tb";

import { AppDispatch, RootState } from "../../../../store/store";
import { setFilter } from "../../../../store/reducers/table/filter";

const FilterHandler = () => {
  const { data } = useSelector((state: RootState) => state.table.filters);
  const devMode = process.env.NODE_ENV === "debug";
  const allEntries = Object.entries(data)
    .flatMap(([key, values]) => {
      if (Array.isArray(values)) {
        // Handle arrays (nested keys)
        return values.map((value) => ({ key, value }));
      } else if (typeof values === "object" && values !== null) {
        // Handle nested objects
        return Object.entries(values).map(([nestedKey, nestedValue]) => ({
          key: `${key}.${nestedKey}`,
          value: nestedValue,
        }));
      } else {
        // Handle top-level non-nested keys
        return [{ key, value: values }];
      }
    })
    .filter(({ value }) => value !== undefined && value !== null);

  console.log({ data, allEntries });

  return (
    <div className={twMerge("flex gap-2", devMode ? "bg-purple-500" : "")}>
      {allEntries.map(({ key, value }) => (
        <FilterChip key={`${key}-${value}`} group={key} type={value} />
      ))}
    </div>
  );
};

export default FilterHandler;

type FilterChipProps = {
  key?: string | number;
  group: string;
  type: string;
};

const FilterChip: React.FC<FilterChipProps> = ({ group, type }) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleFilterClick = () => {
    console.log({ group, type });
    if (group && type) {
      dispatch(setFilter({ key: group, value: type }));
    } else if (!group && type) {
      dispatch(setFilter({ key: type, value: type }));
    }
    dispatch(setFilter({ key: group, value: type }));
  };
  return (
    <div
      onClick={handleFilterClick}
      className={twMerge(
        "flex p-3 h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {type}
      </p>
      <TbTrash />
    </div>
  );
};

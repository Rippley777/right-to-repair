import { twMerge } from "tailwind-merge";
import useDebugMode from "@/hooks/dev/useDebugMode";

const FilterSearch = (/*{ filter, setFilter }*/) => {
  const debugMode = useDebugMode();
  return (
    <div
      className={twMerge(
        "flex flex-wrap items-end gap-4 p-2",
        debugMode && "bg-amber-300"
      )}
    >
      <label className="flex flex-col min-w-40 flex-1">
        <input
          placeholder="Search models"
          className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#FFFFFF] focus:outline-0 focus:ring-0 border border-[#383838] bg-[#242424] focus:border-[#383838] h-14 placeholder:text-[#C4C4C4] p-[15px] text-base font-normal leading-normal"
          value=""
        />
      </label>
    </div>
  );
};
export default FilterSearch;

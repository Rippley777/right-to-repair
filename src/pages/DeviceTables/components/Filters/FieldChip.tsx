import { twMerge } from "tailwind-merge";

type FilterChipProps = {
  key?: string;
  onClick: (type: string) => void;
  type: string;
  subfilter: string | null;
  active: boolean;
};
const FilterChip: React.FC<FilterChipProps> = ({
  key,
  onClick,
  type,
  active,
}) => {
  return (
    <div
      key={key ?? type}
      onClick={onClick as unknown as () => void}
      className={twMerge(
        "flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#292929] pl-4 pr-4 cursor-pointer",
        active ? "bg-[#FF5C00]" : "hover:bg-[#383838] focus:bg-[#383838]"
      )}
    >
      <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
        {type}
      </p>
    </div>
  );
};

export default FilterChip;

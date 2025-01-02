import { useDispatch, useSelector } from "react-redux";
import { toggleVisibility } from "../../../../store/reducers/table/columns";
import { RootState } from "../../../../store/store";

const groupColumns = [
  "Model Details",
  "Repairability",
  "Hardware Details",
  "Repair Insights",
];

const View = () => {
  const dispatch = useDispatch();

  const handleToggle = (type: string) => {
    dispatch(toggleVisibility(type));
  };

  return (
    <>
      <h3 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        View
      </h3>
      <div className="flex flex-col gap-3 p-4">
        {groupColumns.map((column) => (
          <GroupColumnSelector
            key={column}
            title={column}
            onToggle={() => handleToggle(column)}
          />
        ))}
      </div>
    </>
  );
};

type GroupColumnSelectorProps = {
  onToggle: () => unknown;
  title: string;
};

const GroupColumnSelector: React.FC<GroupColumnSelectorProps> = ({
  onToggle,
  title,
}) => {
  const { visibilityStatus } = useSelector(
    (state: RootState) => state.table.columns
  );

  return (
    <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
      <input
        type="radio"
        onClick={onToggle}
        //@ts-expect-error TODO learn typescript lmao
        checked={visibilityStatus[title as unknown]}
        className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
      />
      <div className="flex grow flex-col">
        <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
          {title}
        </p>
      </div>
    </label>
  );
};

export default View;

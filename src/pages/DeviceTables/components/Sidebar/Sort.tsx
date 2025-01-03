import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { toggleSortExpanded } from "../../../../store/reducers/table/features";
import { TbChevronDown, TbChevronRight } from "react-icons/tb";

const Sort = () => {
  const dispatch = useDispatch();
  const { sortExpanded } = useSelector(
    (state: RootState) => state.table.features
  );

  const handleClick = () => {
    dispatch(toggleSortExpanded());
  };
  return (
    <>
      <h3
        onClick={handleClick}
        className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4"
      >
        Sort
        {sortExpanded ? (
          <TbChevronDown className="inline" />
        ) : (
          <TbChevronRight className="inline" />
        )}
      </h3>
      {sortExpanded ? (
        <div className="flex flex-col gap-3 p-4">
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
              checked={undefined}
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Last updated (newest)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Last updated (oldest)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Price (low to high)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Price (high to low)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Units sold (most)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Units sold (least)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Revenue (highest)
              </p>
            </div>
          </label>
          <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
            <input
              type="radio"
              className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
              name="abe8b445-16ea-4d08-87a6-a59aa6ace92b"
            />
            <div className="flex grow flex-col">
              <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
                Revenue (lowest)
              </p>
            </div>
          </label>
        </div>
      ) : null}
    </>
  );
};

export default Sort;

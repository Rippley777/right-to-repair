const Sort = () => {
  return (
    <>
      <h3 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Sort
      </h3>
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
    </>
  );
};

export default Sort;

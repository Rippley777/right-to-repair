const View = () => {
  return (
    <>
      <h3 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        View
      </h3>
      <div className="flex flex-col gap-3 p-4">
        <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
          <input
            type="radio"
            className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
            name="c3cb719f-41c9-44ac-8ab1-f85911c87d60"
            checked={undefined}
          />
          <div className="flex grow flex-col">
            <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
              All models
            </p>
          </div>
        </label>
        <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
          <input
            type="radio"
            className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
            name="c3cb719f-41c9-44ac-8ab1-f85911c87d60"
          />
          <div className="flex grow flex-col">
            <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
              In stock
            </p>
          </div>
        </label>
        <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
          <input
            type="radio"
            className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
            name="c3cb719f-41c9-44ac-8ab1-f85911c87d60"
          />
          <div className="flex grow flex-col">
            <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
              Out of stock
            </p>
          </div>
        </label>
        <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
          <input
            type="radio"
            className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
            name="c3cb719f-41c9-44ac-8ab1-f85911c87d60"
          />
          <div className="flex grow flex-col">
            <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
              Not for sale
            </p>
          </div>
        </label>
        <label className="flex items-center gap-4 rounded-xl border border-solid border-[#383838] p-[15px]">
          <input
            type="radio"
            className="h-5 w-5 border-2 border-[#383838] bg-transparent text-transparent checked:border-[#39E079] checked:bg-[image:--radio-dot-svg] focus:outline-none focus:ring-0 focus:ring-offset-0 checked:focus:border-[#39E079]"
            name="c3cb719f-41c9-44ac-8ab1-f85911c87d60"
          />
          <div className="flex grow flex-col">
            <p className="text-[#FFFFFF] text-sm font-medium leading-normal">
              Recalled
            </p>
          </div>
        </label>
      </div>
    </>
  );
};

export default View;

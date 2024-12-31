import { TbTrident } from "react-icons/tb";

const HomeHeaderSection = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#292929] px-10 py-3">
      <div className="flex items-center gap-4 text-[#FFFFFF]">
        <TbTrident size={36} color="white" />
        <h2 className="text-[#FFFFFF] text-lg font-bold leading-tight tracking-[-0.015em]">
          RIP Repair
        </h2>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-9">
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Models
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Repairs
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            Insights
          </a>
          <a
            className="text-[#FFFFFF] text-sm font-medium leading-normal"
            href="#"
          >
            API Docs
          </a>
        </div>
        <div className="flex gap-2">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#39E079] text-[#141414] text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">New</span>
          </button>
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#292929] text-[#FFFFFF] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div
              className="text-[#FFFFFF]"
              data-icon="Bell"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage:
              'url("https://cdn.usegalileo.ai/sdxl10/a245309c-1e3c-4d2e-ab37-e62e455b4346.png")',
          }}
        ></div>
      </div>
    </header>
  );
};

export default HomeHeaderSection;

// import NavigationMenu from "@ui/src/components/navigation-menu";

function HomePortalsSection() {
  return (
    <div>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        What Are You Waiting For?
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        <div className="flex flex-col gap-3 text-center pb-3">
          <div className="px-4">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
              style={{
                backgroundImage:
                  "url('https://cdn.usegalileo.ai/sdxl10/f00c91db-a893-45fd-bc66-a028982070d3.png')",
              }}
            ></div>
          </div>
          <p className="text-white text-base font-medium leading-normal">
            Storm the Marketplace
          </p>
        </div>
        <div className="flex flex-col gap-3 text-center pb-3">
          <div className="px-4">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
              style={{
                backgroundImage:
                  "url('https://cdn.usegalileo.ai/sdxl10/fbe0a569-3ae5-49ad-a96e-7516b3a1311f.png')",
              }}
            ></div>
          </div>
          <p className="text-white text-base font-medium leading-normal">
            Read the Latest
          </p>
        </div>
        <div className="flex flex-col gap-3 text-center pb-3">
          <div className="px-4">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
              style={{
                backgroundImage:
                  "url('https://cdn.usegalileo.ai/sdxl10/424a43c1-4c80-4b8e-be13-64a47c0c4747.png')",
              }}
            ></div>
          </div>
          <p className="text-white text-base font-medium leading-normal">
            Join the Forum
          </p>
        </div>
        <div className="flex flex-col gap-3 text-center pb-3">
          <div className="px-4">
            <div
              className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-full"
              style={{
                backgroundImage:
                  "url('https://cdn.usegalileo.ai/sdxl10/eab21d3e-f096-4c55-8f07-7dc4d5ee10f4.png')",
              }}
            ></div>
          </div>
          <p className="text-white text-base font-medium leading-normal">
            Smartwatch
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomePortalsSection;

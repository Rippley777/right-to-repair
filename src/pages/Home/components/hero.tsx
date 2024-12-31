// import NavigationMenu from "@ui/src/components/navigation-menu";

const HomeHeroSection = () => {
  return (
    <div className="@container">
      <div className="@[480px]:p-4">
        <div
          className="bg-hero-background flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
          style={{
            backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.1) 0%,
          rgba(0, 0, 0, 0.4) 100%
        ),`,
          }}
        >
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
              Take Back What’s Yours
            </h1>
            <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
              Get your team on the same page, by designing in real-time with
              Figma
            </h2>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#28bac5] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
            <span className="truncate">Create free account</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeHeroSection;

// import NavigationMenu from "@ui/src/components/navigation-menu";
import {
  TbBuildingStore as StoreIcon,
  TbAd2 as WriteUpIcon,
  TbAlien as CommunityIcon,
  TbAntenna as GroupIcon,
} from "react-icons/tb";

function HomeBlocksSection() {
  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Here’s What We’re About:
      </h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 p-4">
        <Block
          title="Marketplace"
          subtitle="Fight the Waste, Trade the Parts"
          description="Buy, sell, and swap gear like your life depends on it—because the planet kind of does."
          icon={
            <StoreIcon className="text-white" size={48} color="currentColor" />
          }
        />

        <Block
          title="Write-ups"
          subtitle="No Fluff, Just Fixes and Fights"
          description="Dropping truth bombs about
              shady corporate practices, serving up step-by-step repair
              guides, and the people pushing the
              right-to-repair movement forward"
          icon={
            <WriteUpIcon
              className="text-white"
              size={48}
              color="currentColor"
            />
          }
        />
        <Block
          title="Custom Communities"
          subtitle="Raise *** Together"
          description="Create customizable group pages. Organize, compete, and recruit with other people to your cause."
          icon={
            <CommunityIcon
              className="text-white"
              size={48}
              color="currentColor"
            />
          }
        />
        <Block
          title="Special Op Groups"
          subtitle="Organize Your Group"
          description="Create group pages and customize them to fit your needs. Share files, photos, and more."
          icon={
            <GroupIcon className="text-white" size={48} color="currentColor" />
          }
        />
      </div>
    </>
  );
}

export default HomeBlocksSection;

type BlockProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
};

const Block: React.FC<BlockProps> = ({
  title,
  subtitle,
  description,
  icon,
}) => {
  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-[#3c4753] bg-[#1c2126] p-4 flex-col">
      <div className="self-center">{icon}</div>
      <div className="flex flex-col gap-1">
        <h2 className="text-white text-base font-bold leading-tight">
          {title}
        </h2>
        <p className="text-[#9dabb8] text-sm font-normal leading-normal">
          {subtitle}
        </p>
        <p>{description}</p>
      </div>
    </div>
  );
};

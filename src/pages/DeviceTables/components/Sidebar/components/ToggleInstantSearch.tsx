import { Switch } from "@ui";

type ToggleInstantSearchProps = {
  instantSearch: boolean;
  handleToggle: () => void;
};
const ToggleInstantSearch: React.FC<ToggleInstantSearchProps> = ({
  instantSearch,
  handleToggle,
}) => {
  return (
    <div className="flex justify-between items-center bg-[#333] rounded-xl m-4 p-2">
      <span className="flex items-center gap-2 p-2 text-white">
        {/* TODO this used to be Instant search so the logic is backwards here */}
        Low Data Mode
        <Switch checked={!instantSearch} onCheckedChange={handleToggle} />
      </span>
      {/* <TbTrash size={24} onClick={handleRefresh} /> */}
    </div>
  );
};

export default ToggleInstantSearch;

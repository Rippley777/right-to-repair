import { Switch } from "@ui";
import { TbTrash } from "react-icons/tb";

type ToggleInstantSearchProps = {
  instantSearch: boolean;
  handleToggle: () => void;
  handleRefresh: () => void;
};
const ToggleInstantSearch: React.FC<ToggleInstantSearchProps> = ({
  instantSearch,
  handleToggle,
  handleRefresh,
}) => {
  return (
    <div className="flex justify-between items-center bg-[#333] rounded-xl m-4 p-4">
      <span className="flex items-center gap-2 p-4 text-white">
        <Switch checked={instantSearch} onCheckedChange={handleToggle} />
        {instantSearch ? `🚀 ` : `📦 `}
        Instant Search
      </span>
      <TbTrash size={24} onClick={handleRefresh} />
    </div>
  );
};

export default ToggleInstantSearch;

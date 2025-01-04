import { Switch } from "@ui";
import { toggleInstantSearch } from "@/store/reducers/table/features";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";

const ToggleInstantSearch = () => {
  const dispatch = useDispatch();
  const { instantSearch } = useSelector(
    (state: RootState) => state.table.features
  );

  const handleInstantSearchToggle = () => {
    dispatch(toggleInstantSearch());
  };
  return (
    <span className="flex items-center gap-2 p-4 text-white">
      <Switch
        checked={instantSearch}
        onCheckedChange={handleInstantSearchToggle}
      />
      {instantSearch ? `🚀 ` : `📦 `}
      Instant Search
    </span>
  );
};

export default ToggleInstantSearch;

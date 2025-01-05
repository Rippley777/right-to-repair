import { FilterTree, flattenTree } from "@/utils/dataUtils";
import FilterChip from "./components/FilterChip";

type FilterDisplayChipsProps = {
  debugMode: boolean;
  activeSubfilters: string[];
  filterTree: FilterTree;
  handleFilterClick: (filter: string, level: number) => void;
};

const FilterDisplayChips: React.FC<FilterDisplayChipsProps> = ({
  debugMode = false,
  activeSubfilters,
  filterTree,
  handleFilterClick,
}): JSX.Element => {
  if (debugMode)
    console.log("SubFilter Display Chip rend:", {
      filterTree,
      activeSubfilters,
      handleFilterClick,
    });
  if (debugMode) console.log("filterTree", filterTree[activeSubfilters[0]]);

  const test = activeSubfilters.map((subfilter) => {
    if (debugMode) console.log("subfilter", subfilter);
  });
  if (debugMode) console.log("test", test);

  const filterKeys = flattenTree(filterTree[activeSubfilters[0]] as FilterTree);
  if (debugMode) console.log("filterKeys", filterKeys);
  return (
    <div className="flex">
      {filterKeys.map((filterKey) => {
        return (
          <FilterChip
            active={false}
            handleFilterClick={handleFilterClick}
            level={activeSubfilters.length - 1}
            key={filterKey}
            type={filterKey}
          />
        );
      })}
    </div>
  );
};

export default FilterDisplayChips;

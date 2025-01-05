// import Subfilter from "./SubfilterBar.tsx.old";
import FilterSearch from "./SearchBar";
import { FilterTree } from "@/utils/dataUtils.ts";
import FilterBar from "./FilterBar";
import FilterDisplayChips from "./FilterDisplayChips.tsx";

type FiltersProps = {
  activeSubfilters: string[];
  debugMode: boolean;
  filterKeys: string[];
  filterTree: FilterTree;
  filterValues: Record<string, unknown>;
  handleFilterClick: (filter: string, level: number) => void;
  search: boolean;
};

const Filters: React.FC<FiltersProps> = ({
  activeSubfilters,
  debugMode,
  filterKeys,
  filterTree,
  filterValues,
  handleFilterClick,
  search,
}) => {
  if (debugMode)
    console.log("Filters rend: 12", { activeSubfilters, filterKeys, search });
  return (
    <div>
      <FilterBar
        activeSubfilters={activeSubfilters}
        debugMode={debugMode}
        filterKeys={filterKeys}
        filterTree={filterTree}
        filterValues={filterValues}
        handleSubfilterClick={handleFilterClick}
      />
      {filterTree && (
        <FilterDisplayChips
          activeSubfilters={activeSubfilters}
          debugMode={debugMode}
          filterTree={filterTree}
          handleFilterClick={handleFilterClick}
        />
      )}
      {search ? <FilterSearch debugMode={debugMode} /> : null}
    </div>
  );
};

export default Filters;

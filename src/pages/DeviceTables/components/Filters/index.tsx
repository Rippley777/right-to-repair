// import Subfilter from "./SubfilterBar.tsx.old";
import FilterSearch from "./SearchBar";
import { FilterTree } from "@/utils/dataUtils.ts";
import FilterBar from "./FilterBar";

type FiltersProps = {
  activeSubfilters: string[];
  debugMode: boolean;
  filterData: Record<string, string | number>;
  filterKeys: string[];
  filterTree: FilterTree;
  filterValues: Record<string, (string | number)[]>;
  handleFilterKeyClick: (filter: string, level: number) => void;
  handleFilterValueClick: (filter: string, level: number) => void;
  search: boolean;
};

const Filters: React.FC<FiltersProps> = ({
  activeSubfilters,
  debugMode,
  filterData,
  filterKeys,
  filterTree,
  filterValues,
  handleFilterKeyClick,
  handleFilterValueClick,
  search,
}) => {
  if (debugMode)
    console.log("Filters rend: 12", { activeSubfilters, filterKeys, search });
  return (
    <div>
      <FilterBar
        activeSubfilters={activeSubfilters}
        debugMode={debugMode}
        filterData={filterData}
        filterKeys={filterKeys}
        filterTree={filterTree}
        filterValues={filterValues}
        handleFilterKeyClick={handleFilterKeyClick}
        handleFilterValueClick={handleFilterValueClick}
      />
      {search ? <FilterSearch debugMode={debugMode} /> : null}
    </div>
  );
};

export default Filters;

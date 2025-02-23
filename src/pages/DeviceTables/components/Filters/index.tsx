// import Subfilter from "./SubfilterBar.tsx.old";
import FilterSearch from "./SearchBar";
import { FilterTree } from "@/utils/dataUtils.ts";
import FilterBar from "./FilterBar";
import { logDebug } from "@/utils/logUtils";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

type FiltersProps = {
  activeSubfilters: string[];
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
  filterData,
  filterKeys,
  filterTree,
  filterValues,
  handleFilterKeyClick,
  handleFilterValueClick,
  search,
}) => {
  const debugMode = useDebugMode()
  logDebug(debugMode, "Filters rend: 12", { activeSubfilters, filterKeys, search });
  return (
    <div>
      <FilterBar
        activeSubfilters={activeSubfilters}
        filterData={filterData}
        filterKeys={filterKeys}
        filterTree={filterTree}
        filterValues={filterValues}
        handleFilterKeyClick={handleFilterKeyClick}
        handleFilterValueClick={handleFilterValueClick}
      />
      {search ? <FilterSearch /> : null}
    </div>
  );
};

export default Filters;


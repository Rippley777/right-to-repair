// import Subfilter from "./SubfilterBar.tsx.old";
import FilterSearch from "./SearchBar";
import FilterBar from "./FilterBar.tsx";
import { FilterBarDetailProps } from "../../types";
import { FilterTree } from "@/utils/dataUtils.ts";
import SubfilterBar from "./SubfilterBar.tsx";

type FiltersProps = {
  activeSubfilters: string[];
  debugMode: boolean;
  filterBarDetails: FilterBarDetailProps[];
  filterKeys: string[];
  filterTree: FilterTree;
  handleFilterClick: (filter: string, key: string, level?: number) => void;
  search: boolean;
};

const Filters: React.FC<FiltersProps> = ({
  activeSubfilters,
  debugMode,
  filterBarDetails,
  filterKeys,
  filterTree,
  handleFilterClick,
  search,
  // level,
}) => {
  if (debugMode)
    console.log("Filters rend: ", { activeSubfilters, filterKeys, search });
  return (
    <div>
      <FilterBar
        debugMode={debugMode}
        filterBarDetails={filterBarDetails}
        filterKeys={filterKeys}
        activeSubfilters={activeSubfilters}
        handleFilterClick={handleFilterClick}
        level={0}
      />
      {activeSubfilters.length > 0 && filterTree
        ? activeSubfilters.map((subfilter, index) => {
            console.log("1234", { subfilter, index, filterTree });
            console.log("12345678", filterTree[subfilter]);

            return (
              <SubfilterBar
                debugMode={debugMode}
                filterBarDetails={[]}
                filterKeys={filterKeys}
                filterTree={filterTree[subfilter] as FilterTree}
                activeSubfilters={activeSubfilters}
                handleFilterClick={handleFilterClick}
                key={subfilter}
                level={index + 1}
              />
            );
          })
        : null}

      {/* {activeSubfilters.length > 0 ? (
        <Subfilter
          activeSubfilters={activeSubfilters}
          debugMode={debugMode}
          filterData={filterData}
          handleFilterClick={handleFilterClick}
        />
      ) : null} */}
      {search ? <FilterSearch debugMode={debugMode} /> : null}
    </div>
  );
};

export default Filters;

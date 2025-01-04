import Subfilter from "./SubfilterBar";
import FilterSearch from "./SearchBar";
import FilterBar from "./FilterBar";

type FiltersProps = {
  activeSubfilter: string | null;
  activeSubfilters: string[];
  filterData: Record<string, string | number>;
  debugMode: boolean;
  filterKeys: string[];
  search: boolean;
  subfilter: string | null;
  handleFilterClick: (filter: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  debugMode,
  filterKeys,
  search,
  subfilter,
  activeSubfilters,
  filterData,
  handleFilterClick,
}) => {
  if (debugMode)
    console.log("FilterFrame rend: ", { filterKeys, search, subfilter });

  return (
    <div>
      <FilterBar
        debugMode={debugMode}
        filterKeys={filterKeys}
        subfilter={subfilter}
        handleFilterClick={handleFilterClick}
      />
      {subfilter ? (
        <Subfilter
          activeSubfilters={activeSubfilters}
          handleFilterClick={handleFilterClick}
          filterData={filterData}
          debugMode={debugMode}
          subfilter={subfilter}
        />
      ) : null}
      {search ? <FilterSearch debugMode={debugMode} /> : null}
    </div>
  );
};

export default Filters;

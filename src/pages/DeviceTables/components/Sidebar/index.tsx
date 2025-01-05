import DevModeToggle from "@/components/dev/DevModeToggle";
import { FilterTree } from "@/utils/dataUtils";

import ActiveFilterBar from "./components/ActiveFilterBar";
import ToggleInstantSearch from "./components/ToggleInstantSearch";
import Actions from "./Actions";
import Columns from "./Columns";
import Sort from "./Sort";

type SidebarProps = {
  actionsExpanded: boolean;
  columnsExpanded: boolean;
  debugMode: boolean;
  filterData: Record<string, string | number>;
  filterTree?: FilterTree;
  handleFilterClick: (filter: string, key: string, level?: number) => void;
  handleRefresh: () => void;
  handleSearch: () => void;
  handleUpdate: () => void;
  handleSidebarExpandColumnsClick: () => void;
  handleInstantSearchToggle: () => void;
  handleSidebarExpandActionClick: () => void;
  handleSidebarExpandSortClick: () => void;
  instantSearch: boolean;
  sortExpanded: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({
  actionsExpanded,
  columnsExpanded,
  debugMode,
  filterData,
  filterTree,
  handleFilterClick,
  handleRefresh,
  handleSearch,
  handleUpdate,
  handleSidebarExpandColumnsClick,
  handleInstantSearchToggle,
  handleSidebarExpandActionClick,
  handleSidebarExpandSortClick,
  instantSearch,
  sortExpanded,
}) => {
  return (
    <div className="flex flex-col justify-start">
      <div className="bg-[#242424] rounded-xl m-4 py-6">
        <ToggleInstantSearch
          handleToggle={handleInstantSearchToggle}
          instantSearch={instantSearch}
          handleRefresh={handleRefresh}
        />
        <ActiveFilterBar
          filterData={filterData}
          debugMode={debugMode}
          handleFilterClick={handleFilterClick}
        />
        <Actions
          actionsExpanded={actionsExpanded}
          handleExpandClick={handleSidebarExpandActionClick}
          handleRefresh={handleRefresh}
          handleSearch={handleSearch}
          handleUpdate={handleUpdate}
        />
        <Columns
          columnsExpanded={columnsExpanded}
          filterTree={filterTree}
          handleExpandClick={handleSidebarExpandColumnsClick}
        />
        <Sort
          handleExpandClick={handleSidebarExpandSortClick}
          sortExpanded={sortExpanded}
        />
      </div>
      <DevModeToggle />
    </div>
  );
};

export default Sidebar;

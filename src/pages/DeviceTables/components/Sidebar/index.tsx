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
  filterData: Record<string, string | number>;
  filterTree: FilterTree;
  handleFilterValueClick: (filter: string, level: number) => void;
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
  filterData,
  filterTree,
  handleFilterValueClick,
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
        />
        <ActiveFilterBar
          handleRefresh={handleRefresh}
          filterData={filterData}
          handleFilterClick={handleFilterValueClick}
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

import Header from "./Header";
import FilterList from "./FilterList";
import { FilterTree } from "@/utils/dataUtils";

type ColumnsProps = {
  columnsExpanded: boolean;
  handleExpandClick: () => void;
  filterTree: FilterTree;
};

const Columns: React.FC<ColumnsProps> = ({
  columnsExpanded,
  handleExpandClick,
  filterTree,
}) => {
  return (
    <div className="text-center">
      <Header columnsExpanded={columnsExpanded} onClick={handleExpandClick} />
      {columnsExpanded && filterTree ? (
        <FilterList filterTree={filterTree} />
      ) : null}
    </div>
  );
};

export default Columns;
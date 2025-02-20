import { FilterTree } from "@/utils/dataUtils";
import SubColumn from "./SubColumn";

const FilterList: React.FC<{ filterTree: unknown }> = ({ filterTree }) => (
    <>
        {Object.keys(filterTree as FilterTree).map((filter) => (
            <SubColumn
                key={filter}
                filter={filter}
                // @ts-expect-error TODO learn typescript
                data={filterTree[filter]}
                level={1}
            />
        ))}
    </>
);

export default FilterList;

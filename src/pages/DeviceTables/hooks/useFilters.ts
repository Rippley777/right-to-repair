import { useDispatch, useSelector } from "react-redux";

import { setFilter } from "@/store/reducers/table/filter";
import { RootState } from "@/store/store";

export const useFilters = () => {
  const filters = useSelector((state: RootState) => state.table.filters);
  const dispatch = useDispatch();

  const updateFilter = (key: string, value: unknown) => {
    switch (typeof value) {
      case "string":
      case "number":
        dispatch(setFilter({ key, value }));
        break;
      default:
        break;
    }
  };

  return { filters, updateFilter };
};

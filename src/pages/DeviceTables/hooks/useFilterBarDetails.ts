import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
import { buildHierarchy } from "@/utils/dataUtils";

export const useFilterBarDetails = () => {
  const { filterKeys } = useSelector((state: RootState) => state.table.filters);
  //   const dispatch = useDispatch();

  //   const test = buildTree(filterKeys);
  //   console.log({ test });
  const filterBarDetails = buildHierarchy(filterKeys, []);

  //   const splitArrayByCondition = (
  //     arr: string[],
  //     conditionFn: (filterKey: string) => boolean
  //   ) => {
  //     const left = [];
  //     const right = [];
  //     for (const item of arr) {
  //       if (conditionFn(item)) {
  //         left.push(item);
  //       } else {
  //         right.push(item);
  //       }
  //     }
  //     return [left, right];
  //   };
  //   console.log({ filterKeys });

  //   const [left, right] = splitArrayByCondition(
  //     filterKeys,
  //     (filterKey: string) => filterKey.indexOf(".") === -1
  //   );
  //   console.log({
  //     left,
  //     right,
  //   });

  return { filterBarDetails };
};

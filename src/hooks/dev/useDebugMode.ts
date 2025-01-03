import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const useDebugMode = (): boolean => {
  return useSelector(
    // @ts-expect-error TODO learn typescript
    (state: RootState): boolean => state.devMode?.debugMode ?? false
  );
};

export default useDebugMode;

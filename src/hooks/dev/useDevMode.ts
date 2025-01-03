import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const useDevMode = (): boolean => {
  return useSelector(
    // @ts-expect-error TODO learn typescript
    (state: RootState): boolean => state.devMode?.devMode ?? false
  );
};

export default useDevMode;

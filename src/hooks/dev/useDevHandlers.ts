import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useDebugMode = (): boolean => {
  return useSelector(
    // @ts-expect-error TODO learn typescript
    (state: RootState): boolean => state.devMode?.debugMode ?? false
  );
};

const useDevMode = (): boolean => {
  return useSelector(
    // @ts-expect-error TODO learn typescript
    (state: RootState): boolean => state.devMode?.devMode ?? false
  );
};

export default {
  useDebugMode,
  useDevMode,
};

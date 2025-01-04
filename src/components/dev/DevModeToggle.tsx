import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDebugMode, toggleDevMode } from "@/store/reducers/devMode";
import { RootState } from "@/store/store";

const DevModeToggle = () => {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const status = useSelector(
    (state: RootState) => state.devMode
  ) as unknown as { devMode: boolean };

  if (process.env.NODE_ENV !== "development") return null;

  if (!status) {
    return null;
  }

  const handleToggleDev = () => {
    dispatch(toggleDevMode());
  };
  const handleToggleDebug = () => {
    dispatch(toggleDebugMode());
  };

  return (
    <>
      <span onClick={() => setCollapsed(collapsed)}>DEV OPTIONS</span>
      <>
        <div onClick={handleToggleDev}>Dev Mode</div>
        <div onClick={handleToggleDebug}>Debug Mode</div>
      </>
    </>
  );
};

export default DevModeToggle;

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDevices } from "../store/reducers/devices";
import { RootState, AppDispatch } from "../store/store"; // Replace with your actual paths

const useDevices = () => {
  const dispatch = useDispatch<AppDispatch>();
  const devices = useSelector<RootState, RootState["devices"]["data"]>(
    (state) => state.devices.data
  );
  const status = useSelector<RootState, RootState["devices"]["status"]>(
    (state) => state.devices.status
  );
  const error = useSelector<RootState, RootState["devices"]["error"]>(
    (state) => state.devices.error
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDevices());
    }
  }, [dispatch, status]);

  return { devices, status, error };
};

export default useDevices;

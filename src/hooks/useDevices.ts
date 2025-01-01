import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDevices } from "../store/reducers/devices";
import { RootState, AppDispatch } from "../store/store";

export const useDevices = () => {
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

  // const { data, total, page, pageSize, loading, error } = useSelector(
  //   (state: RootState) => state.table.filters
  // );
  // const queryParams = new URLSearchParams({
  //   ...(category && { category }),
  //   ...(price_lt && { price_lt }),
  //   page: page || 1,
  //   pageSize: pageSize || 10,
  // });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDevices({}));
    }
  }, [dispatch, status]);

  return { devices, status, error };
};

export default useDevices;

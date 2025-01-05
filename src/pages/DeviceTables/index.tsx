import useWebSocketAnalytics from "@/analytics/useWebSocketAnalytics";
import HomeHeaderSection from "../../components/dev/header";
import TableFrame from "./TableFrame";
import "./table.css";
import { WS_URL } from "@/api";
import { useEffect } from "react";
import { fetchFilterOptions } from "@/store/reducers/table/filter";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

function DeviceTables() {
  const serverUrl = WS_URL;
  const siteId = "Rip2Repair";
  const { isConnected, sendEvent } = useWebSocketAnalytics(serverUrl, siteId);
  const dispatch: AppDispatch = useDispatch();
  const { fetchingFilterOptions } = useSelector(
    (state: RootState) => state.table.filters
  );

  useEffect(() => {
    dispatch(fetchFilterOptions());
  }, [dispatch]);

  useEffect(() => {
    if (isConnected) {
      sendEvent("page_view", {
        page: window.location.pathname,
        referrer: document.referrer,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  if (fetchingFilterOptions) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <HomeHeaderSection />
      <TableFrame />
    </>
  );
}

export default DeviceTables;

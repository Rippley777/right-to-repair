import useWebSocketAnalytics from "@/analytics/useWebSocketAnalytics";
import HomeHeaderSection from "../../components/dev/header";
import TableFrame from "./TableFrame";
import "./table.css";
import { WS_URL } from "@/api";
import { useEffect } from "react";

function DeviceTables() {
  const serverUrl = WS_URL;
  const siteId = "Rip2Repair";
  const { isConnected, sendEvent } = useWebSocketAnalytics(serverUrl, siteId);

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
  return (
    <>
      <HomeHeaderSection />
      <TableFrame />
    </>
  );
}

export default DeviceTables;

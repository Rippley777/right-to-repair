import { useEffect, FC, ReactNode } from "react";
import useWebSocketAnalytics from "./useWebSocketAnalytics";
import { WS_URL } from "@/api";
import { useDebugMode } from "@/hooks/dev/useDevHandlers";

const AnalyticsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const serverUrl = WS_URL;
  console.log("serverUrl", serverUrl);
  const siteId = "Rip2Repair";

  const { isConnected, sendEvent } = useWebSocketAnalytics(serverUrl, siteId);
  const debugMode = useDebugMode();

  useEffect(() => {
    if (!debugMode && isConnected) {
      sendEvent("page_view", {
        page: window.location.pathname,
        referrer: document.referrer,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    }
  }, [isConnected, sendEvent]);

  return <div>{children}</div>;
};

export default AnalyticsProvider;

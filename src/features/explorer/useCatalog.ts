import { useCallback, useEffect, useState } from "react";
import { API_URL } from "@/api";
import { loadApiCatalog } from "./apiCatalog";
import type { CatalogDevice } from "./catalog";

export function useCatalog() {
  const api = typeof API_URL === "string" ? API_URL.trim() : "";
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    devices: CatalogDevice[];
    loading: boolean;
    source: string;
    error: string | null;
  }>({
    devices: [],
    loading: Boolean(api),
    source: "live",
    error: api
      ? null
      : "The device catalog is not configured. Set the existing API URL and restart the app.",
  });
  const retry = useCallback(() => setAttempt((current) => current + 1), []);
  useEffect(() => {
    if (!api) return;
    const controller = new AbortController();
    setState({ devices: [], loading: true, source: "live", error: null });
    loadApiCatalog(api, controller.signal)
      .then((devices) => {
        if (!controller.signal.aborted)
          setState({ devices, loading: false, source: "live", error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted)
          setState({
            devices: [],
            loading: false,
            source: "live",
            error:
              error instanceof Error
                ? error.message
                : "Could not connect to the device API.",
          });
      });
    return () => controller.abort();
  }, [api, attempt]);
  return { ...state, retry };
}

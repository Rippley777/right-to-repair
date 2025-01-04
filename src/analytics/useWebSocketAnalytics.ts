import { useState, useEffect, useRef } from "react";

const useWebSocketAnalytics = (serverUrl: string, siteId: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const socketRef = useRef<WebSocket | null>(null);
  // TODO handle reconnection
  // useEffect(() => {
  //   const connectWebSocket = () => {
  //     const socket = new WebSocket(serverUrl);
  //     socketRef.current = socket;

  //     socket.onopen = () => setIsConnected(true);
  //     socket.onclose = () => setTimeout(connectWebSocket, 5000);
  //   };

  //   connectWebSocket();
  //   return () => socketRef.current && socketRef.current.close();
  // }, [serverUrl]);

  useEffect(() => {
    const socket = new WebSocket(serverUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
      setError(err);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, [serverUrl]);

  const sendEvent = (event: string, metadata = {}) => {
    if (socketRef.current && isConnected) {
      const payload = {
        siteId,
        userId: process.env.NODE_ENV !== "development" ? "prod" : "dev",
        sessionId: "default",
        event,
        metadata,
      };

      socketRef.current.send(JSON.stringify(payload));
    } else {
      console.warn("WebSocket is not connected. Unable to send event.");
    }
  };

  return { isConnected, error, sendEvent };
};

export default useWebSocketAnalytics;

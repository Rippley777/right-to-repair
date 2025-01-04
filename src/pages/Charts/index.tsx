import React from "react";
// import { Link } from "react-router-dom";
import { useDevices } from "@/hooks/useDevices";
import RepairabilityChart from "./Repairability/chart";

const DevicesList: React.FC = () => {
  const { devices, status, error } = useDevices();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="h-1/2 w-full">
      <RepairabilityChart data={devices} />
    </div>
  );
};

export default DevicesList;

import React from "react";
import { Link } from "react-router-dom";
import { useDevices } from "@/hooks/useDevices";
import { Device } from "@/types";

const DevicesList: React.FC = () => {
  const { devices, status, error } = useDevices();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!devices || devices.length === 0) {
    return null;
  }
  return (
    <ul>
      {devices.map((device: Device) => (
        <li key={device.model_identifier}>
          <h2>
            {device.model_identifier} ({device.release_date})
          </h2>
          <p>Repairability Score: {device.repairability_score}</p>
          <Link to={`/device/${device.model_identifier}`}>View Details</Link>
        </li>
      ))}
    </ul>
  );
};

export default DevicesList;

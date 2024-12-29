import React from "react";
import { Link } from "react-router-dom";
import useDevices from "../../hooks/useDevices";

const DevicesList: React.FC = () => {
  const { devices, status, error } = useDevices();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {devices.map((device) => (
        <li key={device.model_identifier}>
          <h2>
            {device.model_identifier} ({device.release_year})
          </h2>
          <p>Repairability Score: {device.repairability_score}</p>
          <Link to={`/device/${device.model_identifier}`}>View Details</Link>
        </li>
      ))}
    </ul>
  );
};

export default DevicesList;

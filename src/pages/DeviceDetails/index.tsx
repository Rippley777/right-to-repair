import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { RootState } from "@/store/store";
import { clearDevice, fetchDeviceById } from "@/store/reducers/device";

const DeviceDetails: React.FC = () => {
  const { model_identifier } = useParams<{ model_identifier: string }>(); // Get the `model_identifier` from the URL
  const dispatch = useDispatch<AppDispatch>();

  const deviceId = useSelector(
    (state: RootState) =>
      state.devices.data.find(
        (device) => device.model_identifier === model_identifier
      )?.model_number
  );

  const device = useSelector((state: RootState) => state.device.data);
  const status = useSelector((state: RootState) => state.device.status);
  const error = useSelector((state: RootState) => state.device.error);

  useEffect(() => {
    if (deviceId) {
      dispatch(fetchDeviceById(`${deviceId}`)); // Fetch the device by its ID
    }

    return () => {
      dispatch(clearDevice()); // Clear device state when unmounting
    };
  }, [dispatch, deviceId]);

  if (!deviceId) {
    return <p>Device not found in the list.</p>;
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!device) {
    return <p>Device not found.</p>;
  }

  return (
    <div>
      <h1>
        {device.model_identifier} ({device.release_date})
      </h1>
      <p>Repairability Score: {device.repairability_score}</p>
      <h2>Hardware Details:</h2>
      {/* <ul>
        <li>Memory: {device.hardware_details.memory}</li>
        <li>Max RAM: {device.hardware_details.max_ram || "N/A"}</li>
        <li>Storage: {device.hardware_details.storage}</li>
        <li>Processor: {device.hardware_details.processor}</li>
      </ul>
      <h2>Repairability Insights:</h2>
      <ul>
        <li>Battery: {device.repairability_insights.battery}</li>
        <li>RAM & Storage: {device.repairability_insights.ram_storage}</li>
        <li>Tools Required: {device.repairability_insights.tools_required}</li>
      </ul> */}
    </div>
  );
};

export default DeviceDetails;

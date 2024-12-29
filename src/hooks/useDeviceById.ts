// import { useState, useEffect } from "react";
// import { fetchDeviceById } from "../store/reducers/device";

// interface Device {
//   model_identifier: string;
//   release_year: number;
//   repairability_score: number;
//   // Add other fields from your API response
// }

// export const useDeviceById = (id: string) => {
//   const [device, setDevice] = useState<Device | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error /*setError*/] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchDevice = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchDeviceById(id);
//         // setDevice(data);
//       } catch (err) {
//         console.error(err);
//         // setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDevice();
//   }, [id]);

//   return { device, loading, error };
// };

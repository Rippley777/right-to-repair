export const getNestedValue = <T>(obj: T, path: string): unknown => {
  if (!path) {
    return undefined;
  }
  if (!path.includes(".")) {
    return obj[path as keyof T];
  }
  return path.split(".").reduce((acc: unknown, key) => {
    if (typeof acc === "object" && acc !== null && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

export const filterValueMap: { [key: string]: string } = {
  type: "Type",
  brand: "Brand",
  model_identifier: "Model ID",
  model_number: "Model No.",
  "hardware_details.memory": "Memory",
  "hardware_details.memory_connector": "Memory Connector",
  "hardware_details.max_ram": "Max RAM",
  "hardware_details.storage": "Storage",
  "hardware_details.storage_connector": "Storage Connector",
  "hardware_details.max_storage": "Max Storage",
  "hardware_details.processor": "Processor",
  "hardware_details.processor_socket": "Processor Socket",
  "hardware_details.gpu_model": "GPU Model",
  "hardware_details.gpu_connector": "GPU Connector",
  "hardware_details.screen_size": "Screen Size",
  "hardware_details.resolution": "Resolution",
  "hardware_details.port_types": "Port Types",
  "hardware_details.wireless": "Wireless",
  "hardware_details.bluetooth_version": "Bluetooth Ver.",
  repair_difficulty: "Repair Difficulty",
  difficulty: "Difficulty",
  for_sale: "For Sale",
  in_stock: "In Stock",
  processor: "Processor",
  recalled: "Recalled",
  storage_capacity: "Storage Capacity",
};

import { Types } from "mongoose";

export type { ObjectId as ObjectId } from "mongoose";
/**
 * Enums for fixed values
 */
export enum RepairDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
  VeryHard = "Very Hard",
  ExtremelyHard = "Extremely Hard",
}

export enum Recyclability {
  Poor = "Poor",
  Average = "Average",
  Good = "Good",
  Excellent = "Excellent",
}

/**
 * Type for estimated repair costs
 */
export type EstimatedRepairCost = {
  battery?: string;
  screen?: string;
  keyboard?: string;
};

/**
 * Type for repairability insights
 */
export interface RepairabilityInsights {
  battery: string;
  ram_storage: string;
  tools_required: string;
  adhesive_level?: string;
  cooling_system?: string;
}

/**
 * Type for hardware details
 */
export interface HardwareDetails {
  memory: string;
  memory_connector: string;
  max_ram?: string;
  storage: string;
  storage_connector: string;
  max_storage?: string;
  processor: string;
  processor_socket: string;
  gpu_model?: string;
  gpu_connector?: string;
  screen_size?: string;
  resolution?: string;
  port_types: string[];
  wireless: string;
  bluetooth_version?: string;
}

/**
 * Main interface for a device
 */
export interface Device {
  _id: Types.ObjectId;
  brand: string;
  type: string;
  model_identifier: string;
  release_year: number;
  model_number: string;
  repairability_score: number;
  hardware_details: HardwareDetails;
  repairability_insights: RepairabilityInsights;
  repair_difficulty?: RepairDifficulty;
  disassembly_steps?: number;
  disassembly_tool_count?: number;
  known_issues: string[];
  replacement_part_availability?: string;
  estimated_repair_cost?: EstimatedRepairCost;
  repair_guide_availability?: string;
  community_score?: number;
  recyclability?: Recyclability;
  images: Types.ObjectId[]; // Array of Mongoose ObjectIds
}

/**
 * Utility Types
 */

// Type for partial updates (PATCH requests)
export type PartialDeviceUpdate = Partial<Device>;

// Read-only version of a device
export type ReadonlyDevice = Readonly<Device>;

// Device without images (lightweight data fetching)
export type DeviceWithoutImages = Omit<Device, "images">;

// Device with populated images (replacing ObjectId with detailed objects)
export interface DeviceImage {
  _id: Types.ObjectId;
  url: string;
  description: string;
}

export interface DeviceWithImages extends Omit<Device, "images"> {
  images: DeviceImage[];
}

/**
 * Type guard to verify a given object conforms to the Device interface
 */
export const isDevice = (obj: unknown): obj is Device => {
  if (
    typeof obj === "object" &&
    obj !== null &&
    typeof (obj as Device).model_identifier === "string" &&
    typeof (obj as Device).release_year === "number" &&
    typeof (obj as Device).repairability_score === "number" &&
    Array.isArray((obj as Device).known_issues)
  ) {
    return true;
  }
  return false;
};

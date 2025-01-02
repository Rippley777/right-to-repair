import { ObjectId } from "mongoose";

export interface Device {
  type: string;
  brand: string;
  model_identifier: string;
  release_date: string;
  discontinued_date?: string;
  model_number: string;
  repairability_score: number;
  hardware_details: {
    memory: {
      format:
        | "DDR4"
        | "DDR5"
        | "LPDDR4"
        | "LPDDR5"
        | "GDDR6"
        | "HBM2"
        | "Other";
      available_sizes: string[];
      max_ram?: string;
      speed?: string;
      ecc?: boolean;
      soldered?: boolean;
      channels?: number;
    };
    storage: Array<{
      type: "HDD" | "SSD" | "NVMe" | "eMMC" | "Hybrid" | "Other";
      capacity: string;
      connector: "SATA" | "PCIe" | "M.2" | "USB" | "Other";
      max_capacity?: string;
      speed?: string;
      removable?: boolean;
      raid_support?: boolean;
    }>;
    processor: {
      model: string;
      socket: string;
      architecture?: string;
      cores?: number;
      threads?: number;
      base_clock?: string;
      boost_clock?: string;
      cache?: string;
      tdp?: string;
      integrated_graphics?: string;
      removable?: boolean;
    };
    gpu: {
      model: string;
      type: "Integrated" | "Dedicated" | "External";
      memory?: string;
      connector?: "PCIe" | "M.2" | "Thunderbolt" | "USB-C" | "Other";
      tdp?: string;
      removable?: boolean;
      cooling_type?: "Passive" | "Active" | "Liquid";
      supported_technologies?: string[];
    };
    screen: {
      size: string;
      resolution: string;
      aspect_ratio?: string;
      refresh_rate?: number;
      panel_type?: "TN" | "IPS" | "OLED" | "AMOLED" | "VA" | "Other";
      brightness?: string;
      touch_support?: boolean;
      hdr_support?: boolean;
    };
    port_types: Array<{
      type:
        | "USB-A"
        | "USB-C"
        | "HDMI"
        | "DisplayPort"
        | "Thunderbolt"
        | "Ethernet"
        | "Audio Jack"
        | "SD Card Slot"
        | "Power Connector"
        | "Other";
      version?: string;
      quantity?: number;
      features?: Array<
        | "Power Delivery"
        | "Video Output"
        | "Fast Charging"
        | "Data Only"
        | "Audio Support"
        | "Other"
      >;
    }>;
    wireless: {
      wifi: {
        standard:
          | "802.11a"
          | "802.11b"
          | "802.11g"
          | "802.11n"
          | "802.11ac"
          | "802.11ax";
        frequency_bands?: ("2.4GHz" | "5GHz" | "6GHz")[];
        mimo_support?: boolean;
        max_speed?: string;
      };
      bluetooth: {
        version?: string;
        low_energy?: boolean;
      };
      cellular?: {
        supported?: boolean;
        technology?: "4G LTE" | "5G" | "3G" | "Other";
      };
      nfc?: boolean;
      gps?: boolean;
    };
    bluetooth: {
      version: string;
      profiles?: Array<
        "A2DP" | "HFP" | "HSP" | "HID" | "PAN" | "PBAP" | "MAP" | "Other"
      >;
      codecs?: Array<"SBC" | "AAC" | "aptX" | "aptX HD" | "LDAC" | "Other">;
      range?: string;
      low_energy?: boolean;
      multipoint?: boolean;
      class?: "Class 1" | "Class 2" | "Class 3" | "Other";
    };
  };
  optical?: {
    drive_type:
      | "SuperDrive"
      | "Combo Drive"
      | "Blu-ray"
      | "DVD-RW"
      | "CD-RW"
      | "Other";
    write_speed?: string;
    read_speed?: string;
    dual_layer_support?: boolean;
    removable?: boolean;
  };
  repairability_insights: {
    tools_required: ObjectId[];
    battery: {
      accessibility: "Easy" | "Moderate" | "Difficult";
      replacement_cost?: string;
      removable?: boolean;
    };
    ram_storage: {
      accessibility: "Easy" | "Moderate" | "Difficult";
      soldered?: boolean;
      max_upgradable?: string;
    };
    adhesive_level?: "Low" | "Medium" | "High";
    cooling_system?: string;
  };
  repair_difficulty?: string;
  disassembly_steps?: number;
  disassembly_tool_count?: number;
  known_issues: string[];
  replacement_part_availability?: string;
  estimated_repair_cost?: {
    battery?: string;
    screen?: string;
    keyboard?: string;
  };
  repair_guide_availability?: string;
  community_score?: number;
  recyclability?: string;
  images?: ObjectId[];
  version?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

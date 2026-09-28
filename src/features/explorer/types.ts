import type { CatalogDevice } from "./catalog";

export interface SharedProps {
  devices: CatalogDevice[];
  saved: string[];
  compare: string[];
  toggleSave: (id: string) => void;
  toggleCompare: (id: string) => void;
  openScores: () => void;
  openIdentify: () => void;
}

export type Family = "MacBook" | "iPhone" | "iPad" | "Desktop";
export interface CatalogDevice {
  id: string;
  identifier?: string;
  name: string;
  subtitle: string;
  model: string;
  family: Family;
  year: number;
  chip: string;
  silicon: boolean;
  score: number | null;
  ram: boolean | null;
  storage: boolean | null;
  battery: string;
  notes: string[];
  source?: string;
  guide: string;
  color: "blue" | "purple" | "gold" | "green" | "pink" | "silver";
}
const laptopSource =
  "https://www.ifixit.com/repairability/laptop-repairability-scores";
// A small, source-linked reference catalog. Scores are iFixit scores, not our own.
// Modern MacBook scores reflect the revised scores on the index (September 2026).
export const catalog: CatalogDevice[] = [
  {
    id: "Mac14,2",
    name: "MacBook Air 13″",
    subtitle: "M2 · 2022",
    model: "A2681",
    family: "MacBook",
    year: 2022,
    chip: "Apple M2",
    silicon: true,
    score: 5,
    ram: false,
    storage: false,
    battery: "Adhesive removal",
    notes: [
      "Memory and storage are integrated into the logic board.",
      "Battery service requires careful adhesive removal.",
      "Apple provides repair manuals and replacement parts.",
    ],
    source: laptopSource,
    guide: "https://www.ifixit.com/Device/Macbook_Air_M2_2022",
    color: "blue",
  },
  {
    id: "MacBookPro18,3",
    name: "MacBook Pro 14″",
    subtitle: "M1 Pro · 2021",
    model: "A2442",
    family: "MacBook",
    year: 2021,
    chip: "Apple M1 Pro",
    silicon: true,
    score: 5,
    ram: false,
    storage: false,
    battery: "Stretch-release tabs",
    notes: [
      "Battery pull tabs help with removal.",
      "Memory and storage cannot be upgraded independently.",
      "The keyboard is riveted into the top case.",
    ],
    source: laptopSource,
    guide: "https://www.ifixit.com/Device/MacBook_Pro_14%22_2021",
    color: "purple",
  },
  {
    id: "Mac14,15",
    name: "MacBook Air 15″",
    subtitle: "M2 · 2023",
    model: "A2941",
    family: "MacBook",
    year: 2023,
    chip: "Apple M2",
    silicon: true,
    score: 5,
    ram: false,
    storage: false,
    battery: "Adhesive removal",
    notes: [
      "Fanless construction means one fewer moving part.",
      "Soldered memory and storage limit future upgrades.",
      "The battery is replaceable, but requires substantial disassembly.",
    ],
    source: laptopSource,
    guide: "https://www.ifixit.com/Device/MacBook_Air_15%22_2023",
    color: "gold",
  },
  {
    id: "MacBookPro9,1",
    name: "MacBook Pro 15″",
    subtitle: "Unibody · Mid 2012",
    model: "A1286",
    family: "MacBook",
    year: 2012,
    chip: "Intel Core i7",
    silicon: false,
    score: 7,
    ram: true,
    storage: true,
    battery: "Screw-mounted",
    notes: [
      "Socketed RAM and a standard SATA drive make upgrades practical.",
      "The battery is held in with screws rather than glue.",
      "The display assembly is more involved to repair.",
    ],
    source:
      "https://www.ifixit.com/Teardown/MacBook+Pro+15-Inch+Unibody+Mid+2012+Teardown/9515",
    guide: "https://www.ifixit.com/Device/MacBook_Pro_15%22_Unibody_Mid_2012",
    color: "green",
  },
  {
    id: "MacBookPro12,1",
    name: "MacBook Pro 13″",
    subtitle: "Retina · Early 2015",
    model: "A1502",
    family: "MacBook",
    year: 2015,
    chip: "Intel Core i5 / i7",
    silicon: false,
    score: 1,
    ram: false,
    storage: true,
    battery: "Strong adhesive",
    notes: [
      "RAM is soldered to the logic board.",
      "The SSD is removable but uses a proprietary connector.",
      "A glued-in battery and fused display complicate repairs.",
    ],
    source:
      "https://www.ifixit.com/Teardown/MacBook+Pro+13-Inch+Retina+Display+Early+2015+Teardown/38300",
    guide:
      "https://www.ifixit.com/Device/MacBook_Pro_13%22_Retina_Display_Early_2015",
    color: "pink",
  },
  {
    id: "MacBookAir5,2",
    name: "MacBook Air 13″",
    subtitle: "Intel · Mid 2012",
    model: "A1466",
    family: "MacBook",
    year: 2012,
    chip: "Intel Core i5 / i7",
    silicon: false,
    score: 4,
    ram: false,
    storage: true,
    battery: "Screw-mounted",
    notes: [
      "The battery is secured with screws and can be replaced.",
      "The removable SSD uses a proprietary form factor.",
      "Soldered RAM cannot be upgraded.",
    ],
    source:
      "https://www.ifixit.com/Teardown/MacBook+Air+13-Inch+Mid+2012+Teardown/9457",
    guide: "https://www.ifixit.com/Device/MacBook_Air_13%22_Mid_2012",
    color: "silver",
  },
  {
    id: "iPhone17,3",
    name: "iPhone 16",
    subtitle: "A18 · 2024",
    model: "A3081",
    family: "iPhone",
    year: 2024,
    chip: "Apple A18",
    silicon: true,
    score: 7,
    ram: false,
    storage: false,
    battery: "Electrically released adhesive",
    notes: [
      "Electrically released battery adhesive improves battery service.",
      "Front and rear access make components easier to reach.",
      "Repair Assistant supports configuration after compatible repairs.",
    ],
    source: "https://www.ifixit.com/News/100352/we-hot-wired-the-iphone-16",
    guide: "https://www.ifixit.com/Device/iPhone_16",
    color: "blue",
  },
  {
    id: "iPad7,11",
    name: "iPad 10.2″",
    subtitle: "7th generation · 2019",
    model: "A2197",
    family: "iPad",
    year: 2019,
    chip: "Apple A10 Fusion",
    silicon: true,
    score: 2,
    ram: false,
    storage: false,
    battery: "Strong adhesive",
    notes: [
      "Adhesive makes opening the display and removing the battery difficult.",
      "The glass and LCD can be replaced separately.",
      "The Lightning port is soldered to the logic board.",
    ],
    source: "https://www.ifixit.com/Teardown/iPad+7+Teardown/126291",
    guide: "https://www.ifixit.com/Device/iPad_7",
    color: "pink",
  },
  {
    id: "Macmini8,1",
    name: "Mac mini",
    subtitle: "Intel · 2018",
    model: "A1993",
    family: "Desktop",
    year: 2018,
    chip: "Intel Core i3 / i5 / i7",
    silicon: false,
    score: 6,
    ram: true,
    storage: false,
    battery: "No main battery",
    notes: [
      "SO-DIMM memory is replaceable after disassembly.",
      "The SSD is soldered to the logic board.",
      "The fan and power supply are modular.",
    ],
    source:
      "https://www.ifixit.com/Teardown/Mac+mini+Late+2018+Teardown/115210",
    guide: "https://www.ifixit.com/Device/Mac_mini_Late_2018",
    color: "silver",
  },
  {
    id: "iMac21,1",
    name: "iMac 24″",
    subtitle: "M1 · 2021",
    model: "A2438",
    family: "Desktop",
    year: 2021,
    chip: "Apple M1",
    silicon: true,
    score: 2,
    ram: false,
    storage: false,
    battery: "No main battery",
    notes: [
      "Opening the computer requires cutting display adhesive.",
      "Memory and storage are soldered and cannot be upgraded.",
      "Several smaller components can be replaced independently.",
    ],
    source: "https://www.ifixit.com/Teardown/iMac+M1+24-Inch+Teardown/142850",
    guide: "https://www.ifixit.com/Device/iMac_M1_24%22_2021",
    color: "green",
  },
];
export const scoreBand = (score: number | null) =>
  score === null
    ? "unknown"
    : score >= 7
      ? "easy"
      : score >= 4
        ? "moderate"
        : "hard";
export const scoreLabel = (score: number | null) =>
  ({
    easy: "More repairable",
    moderate: "Some challenges",
    hard: "Hard to repair",
    unknown: "Not scored",
  })[scoreBand(score)];
export const upgradeLabel = (value: boolean | null) =>
  value === null ? "Not documented" : value ? "Replaceable" : "Soldered";

export interface Filters {
  query: string;
  family: string;
  score: string;
  year: string;
  chip: string;
  ram: boolean;
  storage: boolean;
  sort: string;
}
export function filterDevices(devices: CatalogDevice[], filters: Filters) {
  const words = filters.query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return devices
    .filter((d) => {
      const haystack =
        `${d.name} ${d.subtitle} ${d.id} ${d.identifier ?? ""} ${d.model} ${d.chip} ${d.family} ${d.year}`.toLowerCase();
      return (
        words.every((word) => haystack.includes(word)) &&
        (!filters.family || d.family === filters.family) &&
        (!filters.score || scoreBand(d.score) === filters.score) &&
        (!filters.year || String(d.year) === filters.year) &&
        (!filters.chip ||
          (filters.chip === "silicon" ? d.silicon : /intel/i.test(d.chip))) &&
        (!filters.ram || d.ram === true) &&
        (!filters.storage || d.storage === true)
      );
    })
    .sort((a, b) =>
      filters.sort === "newest"
        ? b.year - a.year
        : filters.sort === "score"
          ? (b.score ?? -1) - (a.score ?? -1)
          : filters.sort === "lowest"
            ? (a.score ?? 11) - (b.score ?? 11)
            : 0
    );
}

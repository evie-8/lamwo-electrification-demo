export const iconUrls = [
  "/education.png",
  "/hospital.png",
  "/commercial.png",
  "/administrative.png",
  "/uncategorized.png",
];
export const iconNames = [
  "school-icon",
  "hospital-icon",
  "commercial-icon",
  "administrative-icon",
  "uncategorized-icon",
];

export const categoriesVillages = [
  {
    category: "Candidate for solar home systems",
    text: "Solar Candidate",
    color: "#ccc",
    source_id: "candidate_for_solar_home_systems",
  },
  {
    category: "Existing minigrid site",
    text: "Existing Grid",
    color: "#3CB371",
    source_id: "existing_minigrid_site",
  },
  {
    category: "Grid extension",
    text: "Grid Extension",
    color: "#FF7F50",
    source_id: "grid_extension",
  },
  {
    category: "Candidate minigrid site",
    text: "Mini Grid Candidate",
    color: "#4682B4",
    source_id: "candidate_minigrid_site",
  },
];

export const interactiveLayerIds = [
  "lamwo_villages",
  "lamwo_villages_outline",
  "viilage_name",
  "solar_home_systems",
  "candidate_mg_site",
  "grid_extension",
  "existing_mg_site",
  "uncategorized_buildings",
  "administrative_buildings",
  "school_buildings",
  "commercial_buildings",
  "health_facility_buildings",
]

export const categoryColorMapping: { [key: string]: string } = {
  candidate_for_solar_home_systems: "#CCC",
  candidate_minigrid_site: "#4682B4",
  existing_minigrid_site: "#3CB371",
  grid_extension: "#FF7F50",
  default: "#EDEDED",
};

export const layers = [
  {
    id: "candidate_for_solar_home_systems",
    color: "#CCC",
    text: "Candidate for solar",
  },
  {
    id: "candidate_minigrid_site",
    color: "#4682B4",
    text: "Candidate for mini grid",
  },
  {
    id: "existing_minigrid_site",
    color: "#3CB371",
    text: "Existing mini grid",
  },
  {
    id: "grid_extension",
    color: "#FF7F50",
    text: "Grid extension",
  },
];

export const grids = [
  {
    id: "candidate_MGs_layer",
    text: "Candidate mini grid",
    color: "",
    url: "/location.png",
  },
  {
    id: "existing_MGs_layer",
    text: "Existing mini grid",
    color: "",
    url: "/location1.png",
  },
  {
    id: "grid_electricity",
    text: "Electricity grid",
    color: "#ffffff",
    url: "",
  },
];

export const buildingCategories = [
  { id: "school_buildings", text: "School", url: "/education.png" },
  {
    id: "administrative_buildings",
    text: "Administrative",
    url: "/administrative.png",
  },
  {
    id: "health_facility_buildings",
    text: "Health facility",
    url: "/hospital.png",
  },
  { id: "commercial_buildings", text: "Commercial", url: "/commercial.png" },
  {
    id: "uncategorized_buildings",
    text: "Uncategorized",
    //url: "/uncategorized.png",
    color: "#00F",
  },
];
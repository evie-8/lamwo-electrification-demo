import { LayerProps } from "react-map-gl";

// const theme = {
//   "light": "mapbox://styles/mapbox/light-v10",
//   "dark": "mapbox://styles/mapbox/navigation-night-v1"
// }

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

export  const categoriesVillages = [
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

export const categoryVillagesSources = [
  {
    source_id: "candidate_for_solar_home_systems",
    source_config: {
      type: "geojson",
      promoteId: "ID",
      data: "/geojson_maps/candidate_for_solar_home_systems.geojson",
    },
  },
  {
    source_id: "candidate_minigrid_site",
    source_config: {
      type: "geojson",
      promoteId: "ID",
      data: "/geojson_maps/candidate_minigrid_site.geojson",
    },
  },
  {
    source_id: "existing_minigrid_site",
    source_config: {
      type: "geojson",
      promoteId: "ID",
      data: "/geojson_maps/existing_minigrid_site.geojson",
    },
  },
  {
    source_id: "grid_extension",
    source_config: {
      type: "geojson",
      promoteId: "ID",
      data: "/geojson_maps/grid_extension.geojson",
    },
  },
];

export const categoryVillagesLayers: LayerProps[] = [
  {
    id: "solar_home_systems",
    type: "fill",
    source: "candidate_for_solar_home_systems",
    paint: {
      "fill-color": "#CCC",
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "click"], false],
        0.3,
        1,
      ],
    },
  },
  {
    id: "candidate_mg_site",
    type: "fill",
    source: "candidate_minigrid_site",
    paint: {
      "fill-color": "#4682B4", // Steel blue for candidate minigrid sites
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "click"], false],
        0.3,
        1,
      ],
    },
  },
  {
    id: "existing_mg_site",
    type: "fill",
    source: "existing_minigrid_site",
    paint: {
      "fill-color": "#3CB371", // Lime green for existing minigrid sites
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "click"], false],
        0.3,
        1,
      ],
    },
  },
  {
    id: "grid_extension",
    type: "fill",
    source: "grid_extension", 
    paint: {
      "fill-color": "#FF7F50", // red orange for grid extension
      "fill-opacity": [
        "case",
        ["boolean", ["feature-state", "click"], false],
        0.3,
        1,
      ],
    },
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
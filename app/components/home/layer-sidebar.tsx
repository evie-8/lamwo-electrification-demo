"use client";

import { useState } from "react";
import { useMapContext } from "../map-provider";
import FilterCategory from "./filter-category";
import Image from "next/image";
import { RefreshCcwIcon } from "lucide-react";

const layers = [
  {
    id: "solar_home_systems",
    color: "#CCC",
    text: "Candidate for solar",
  },
  {
    id: "candidate_mg_site",
    color: "#4682B4",
    text: "Candidate for mini grid",
  },
  {
    id: "existing_mg_site",
    color: "#3CB371",
    text: "Existing mini grid",
  },
  {
    id: "grid_extension",
    color: "#FF7F50",
    text: "Grid extension",
  },
];

const grids = [
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

const buildingCategories = [
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
    url: "/uncategorized.png",
  },
];

const LayersSideBar = () => {
  const defaultLayerVisibility = {
    solar_home_systems: true,
    candidate_mg_site: true,
    existing_mg_site: true,
    grid_extension: true,
    grid_electricity: true,
    health_facility_buildings: true,
    administrative_buildings: true,
    commercial_buildings: true,
    school_buildings: true,
    uncategorized_buildings: true,
    candidate_MGs_layer: false,
    existing_MGs_layer: false,
  };

  const { mapRef } = useMapContext();
  const [layerVisibility, setLayerVisibility] = useState<{
    [key: string]: boolean;
  }>(defaultLayerVisibility);

  const resetLayerVisibility = () => {
    const map = mapRef.current.getMap();

    // Loop through each layer and reset to default visibility
    Object.keys(defaultLayerVisibility).forEach((layer) => {
      const isVisible = defaultLayerVisibility[layer];
      map.setLayoutProperty(
        layer,
        "visibility",
        isVisible ? "visible" : "none"
      );
    });

    // Reset the state to default visibility
    setLayerVisibility(defaultLayerVisibility);
  };

  return (
    <div className={`layer-sidebar`}>
      <div className="title">
        <div className="flex gap-3 items-center justify-center">
          <Image
            src={"/filter.png"}
            alt="filter icon"
            className="aspect-square w-5 h-5"
            width={10}
            height={10}
          />
          <h1 className=" text-sunbird-navy-blue">Filters</h1>
        </div>
        <button
          onClick={resetLayerVisibility}
          className="text-sunbird-navy-blue text-[14px] hover:opacity-60"
        >
          <RefreshCcwIcon size={20} fontWeight={800} />
        </button>
      </div>

      <div className="px-4 overflow-y-auto">
        <FilterCategory
          layerVisibility={layerVisibility}
          setLayerVisibility={setLayerVisibility}
          mapRef={mapRef}
          title="Villages"
          items={layers}
        />{" "}
        <FilterCategory
          layerVisibility={layerVisibility}
          setLayerVisibility={setLayerVisibility}
          mapRef={mapRef}
          title="Grids"
          items={grids}
        />
        <FilterCategory
          layerVisibility={layerVisibility}
          setLayerVisibility={setLayerVisibility}
          mapRef={mapRef}
          title="Buildings"
          items={buildingCategories}
        />
        
      </div>
    </div>
  );
};

export default LayersSideBar;

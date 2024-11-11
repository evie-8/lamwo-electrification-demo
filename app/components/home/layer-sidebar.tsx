"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { RefreshCcwIcon } from "lucide-react";
import { FilterSpecification } from "mapbox-gl";
import styles from "@/app/styles/layer-sidebar.module.css";
import { useMapContext } from "@/app/providers/map-provider";
import FilterCategory from "@/app/components/home/filter-category";
import useWindowDimensions from "@/hooks/window-dimensions";
import { LayerKeys } from "@/types";
import {
  buildingCategories,
  categoryColorMapping,
  grids,
  layers,
} from "@/constants";
//import { DualThumbSlider } from "../ui/slider";

const LayersSideBar = () => {
  const defaultLayerVisibility = {
    candidate_for_solar_home_systems: true,
    candidate_minigrid_site: true,
    existing_minigrid_site: true,
    grid_extension: true,
    grid_electricity: true,
    health_facility_buildings: true,
    administrative_buildings: true,
    commercial_buildings: true,
    school_buildings: true,
    uncategorized_buildings: true,
    candidate_MGs_layer: true,
    existing_MGs_layer: true,
  };

  const { width } = useWindowDimensions();

  const { mapRef, sideBar, setSideBar } = useMapContext();
  const [spin, setSpin] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<{
    [key: string]: boolean;
  }>(defaultLayerVisibility);

  useEffect(() => {
    if (width >= 1024 && width <= 1250) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  }, [width, setSideBar]);

  const resetLayerVisibility = () => {
    setSpin(true);

    const map = mapRef?.current?.getMap();

    // Loop through each layer and reset to default visibility
    Object.keys(defaultLayerVisibility).forEach((layer) => {
      const isVisible = defaultLayerVisibility[layer as LayerKeys];

      // Check if the layer is a category that requires color resetting
      if (categoryColorMapping[layer]) {
        // Reset the colors for the lamwo_villages layer
        const colorExpression: FilterSpecification = [
          "match",
          ["get", "category"],
        ];

        // Iterate over the categories to set their default colors
        Object.keys(categoryColorMapping).forEach((category) => {
          colorExpression.push(
            category,
            categoryColorMapping[category] // Use the color for each category
          );
        });

        // Add a default color at the end of the expression
        colorExpression.push(categoryColorMapping.default);

        // Apply the color expression to the lamwo_villages layer
        map?.setPaintProperty("lamwo_villages", "fill-color", colorExpression);
      } else {
        // For layers that are not categories, set their visibility
        map?.setLayoutProperty(
          layer,
          "visibility",
          isVisible ? "visible" : "none"
        );
      }
    });

    // Reset the state to default visibility
    setLayerVisibility(defaultLayerVisibility);
    setTimeout(() => setSpin(false), 500);
  };

  return (
    <div
      className={`${styles.layer_sidebar}  ${
        width < 1024 || !sideBar ? "hidden" : "flex"
      }`}
    >
      <div className={styles.title}>
        <div className={styles.title_wrapper}>
          <Image src={"/filter.png"} alt="filter icon" width={10} height={10} />
          <h1>Filters</h1>
        </div>
        <button
          onClick={resetLayerVisibility}
          className={`${spin && "animate-spin"}`}
        >
          <RefreshCcwIcon size={20} fontWeight={800} />
        </button>
      </div>

      <div className={styles.filter_wrapper}>
        <FilterCategory
          layerVisibility={layerVisibility}
          setLayerVisibility={setLayerVisibility}
          mapRef={mapRef}
          title="Villages"
          items={layers}
        />
        {/* <DualThumbSlider /> */}
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

import bbox from "@turf/bbox";
import {Feature} from "geojson"
import { MapRef } from "react-map-gl";
import villages from "@/public/villages.json"
import { categoriesVillages } from "@/constants";

export const handleFeatureSelection = (
    mapInstance: MapRef,
    feature: Feature,
    previousSelectedFeature : Feature | null | undefined, 
    previousFilteredBuildings: Feature[] | null, 
  ) => {
    if (!feature || feature === previousSelectedFeature) return;
  
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);

  const sources = getVillageSources(feature)
    const boundsFilter = [
      "all",
      "within",
      {
        type: "Polygon",
        coordinates: [
          [
            [minLng, minLat],
            [maxLng, minLat],
            [maxLng, maxLat],
            [minLng, maxLat],
            [minLng, minLat],
          ],
        ],
      },
    ];
  
    mapInstance?.current?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 20, duration: 1000 }
    );
  
  
   

    if (previousSelectedFeature) {
      sources?.forEach((source) => {
        mapInstance?.current?.setFeatureState(
          { source, id: Number(previousSelectedFeature.id) },
          { click: false }
        );
      });
    }
  

    sources?.forEach((source) => {
      mapInstance?.current?.setFeatureState(
        { source, id: Number(feature.id) },
        { click: true }
      );
    });

    const buildingsFiltered = mapInstance?.current?.querySourceFeatures(
      "lamwo_buildings",
      {
        filter: boundsFilter,
      }
    );
  
  
    if (buildingsFiltered) {
      if (previousFilteredBuildings) {
       
        previousFilteredBuildings.forEach((building: Feature) => {
          mapInstance?.current?.setFeatureState(
            { source: "lamwo_buildings", id: building.id },
            { visible: false }
          );
        });
      }
  
      buildingsFiltered.forEach((building: Feature) => {
        mapInstance?.current?.setFeatureState(
          { source: "lamwo_buildings", id: Number(building.id) },
          { visible: true }
        );
      });
  
      return {
        newSelectedFeature: feature,
        newFilteredBuildings: buildingsFiltered,
      };
    }
  
    return null;
  };

  export const getVillageSources = (feature: Feature | null | undefined) => {
    const filteredVillage = villages.filter(
      (v) => v.ID === feature?.id
    )[0];
    const sourceFiltered = categoriesVillages.filter(
      (f) => f.category === filteredVillage.NES_category
    )[0];

    const sources = ["id_lamwovillages", sourceFiltered.source_id];
    return sources

  }
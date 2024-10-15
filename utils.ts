import bbox from "@turf/bbox";
import axios from "axios";
import {Feature} from "geojson"
import { MapRef } from "react-map-gl";

export const handleFeatureSelection = (
    mapInstance: MapRef,
    feature: Feature,
    previousSelectedFeature : Feature | null | undefined, 
    previousFilteredBuildings: Feature[] | null, 
    sources: string[] | null | undefined
  ) => {
    if (!feature) return;
  
    const [minLng, minLat, maxLng, maxLat] = bbox(feature);
  
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
  
    mapInstance?.current.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 20, duration: 1000 }
    );
  
    if (previousSelectedFeature) {
      sources?.forEach((source) => {
        mapInstance?.current.setFeatureState(
          { source, id: Number(previousSelectedFeature.id) },
          { click: false }
        );
      });
    }
  
    sources?.forEach((source) => {
      mapInstance?.current.setFeatureState(
        { source, id: Number(feature.id) },
        { click: true }
      );
    });

    const buildingsFiltered = mapInstance?.current.querySourceFeatures(
      "lamwo_buildings",
      {
        filter: boundsFilter,
      }
    );
  
    console.log(buildingsFiltered);
  
    if (buildingsFiltered) {
      if (previousFilteredBuildings) {
       
        previousFilteredBuildings.forEach((building: Feature) => {
          mapInstance?.current.setFeatureState(
            { source: "lamwo_buildings", id: building.id },
            { visible: false }
          );
        });
      }
  
      buildingsFiltered.forEach((building: Feature) => {
        mapInstance?.current.setFeatureState(
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
  
export const fetchVillages = async (search = "", page = 1, category = "") => {
  try {
    const response = await axios.get(
      `/api/villages`, 
      {
        params: {
          page,
          search: search || undefined,
          category: category || undefined,
        }
      }
    );

    if (response.data) {
      console.log("data", response.data.totalPages);
      return response.data.data;
    }
  } catch (error) {
    console.error("Failed to fetch villages", error);
    return null;
  }
};

export const getTotalPages = async (category = "") => {
    try {
      const response = await axios.get(
        `/api/pages`, 
        {
          params: {
           
            category: category || undefined,
          }
        }
      );
  
      if (response.data) {
        console.log("Total pages", response.data.totalPages);
        return response.data.totalPages;
      }
    } catch (error) {
      console.error("Failed to fetch total Pages", error);
      return null;
    }
  };
  
export const measureCoordDistance = (
    lat1: any,
    lon1: any,
    lat2: any,
    lon2: any,
    unit: any
  ) => {
    lat1 = parseFloat(lat1);
    lon1 = parseFloat(lon1);
    lat2 = parseFloat(lat2);
    lon2 = parseFloat(lon2);
  
    if (lat1 === lat2 && lon1 === lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit === "K") {
        dist = dist * 1.609344;
      }
      if (unit === "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }
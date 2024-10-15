"use client";

import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import MapLayers from "./layers/map-layers";
import { MapMouseEvent } from "react-map-gl";
import { useEffect, useState } from "react";
import bbox from "@turf/bbox";
import { useMapContext } from "./map-provider";
import { Feature } from "geojson";
import villages from "@/public/villages.json";
import ResetControl from "./reset-control";
import { categoriesVillages, interactiveLayerIds } from "@/constants";
import { handleFeatureSelection } from "@/utils";
interface MapProps {
  children?: React.ReactNode;
}

const MapInterface: React.FC<MapProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const {
    mapRef,
    setMapRef,
    selectedFeature,
    setSelectedFeature,
    filteredBuildings,
    setFilteredBuildings,
    setDetailsVillage,
    setScreen,
    key,
    sideBar,
    rightSideBar,
  } = useMapContext();
  const current = mapRef.current;
  const map = current?.getMap();
  let mapWidth = `100vw`;
  let zoom = 8.7;
  if (rightSideBar && sideBar) {
    mapWidth = `calc(100vw-600px)`;
  } else if (rightSideBar) {
    mapWidth = `calc(100vw-350px)`;
    zoom = 9;
  } else if (sideBar) {
    mapWidth = `calc(100vw-250px)`;
    zoom = 9;
  } else {
    mapWidth = `100vw`;
    zoom = 9.1;
  }

  const handleClick = (event: MapMouseEvent) => {
    const features = event.features;
    const sources = features?.map((f) => f.source);

    console.log("sources", sources);
    const feature = features?.filter(
      (f) => f.layer?.id === "lamwo_villages"
    )[0];

    if (feature) {
      const results = handleFeatureSelection(
        mapRef,
        feature,
        selectedFeature,
        filteredBuildings,
        sources
      );
      setFilteredBuildings(results?.newFilteredBuildings);
      setSelectedFeature(results?.newSelectedFeature);
      const village = villages.find((village) => village.ID === feature.id);
      setDetailsVillage(village);
      setScreen("Villages Details");
    }
  };

  const centerMap = () => {
    map?.flyTo({
      center: [32.765, 3.508],
      zoom: zoom,
      essential: true,
      animate: true,
    });
    if (selectedFeature) {
      current?.setFeatureState(
        {
          source: "id_lamwovillages",
          id: Number(selectedFeature.id),
        },
        {
          click: false,
        }
      );
    }
  };
  const centerControl = new ResetControl({ eventHandler: centerMap });

  useEffect(() => {
    if (current) {
      map?.addControl(centerControl, "bottom-right");
    }

    // Clean up the control on unmount
    return () => {
      if (current) {
        map?.removeControl(centerControl);
      }
    };
  }, [mapRef, centerControl]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <section className="map-container">
      <Map
        ref={(ref) => setMapRef(ref)}
        key={key}
        mapboxAccessToken="pk.eyJ1IjoiZW13ZWJhemUiLCJhIjoiY2w2OHRpMzI5MGJhNDNkcGUycjVoYmZoNiJ9.XngKi9j4uHqN0iiJSlMyhQ"
        initialViewState={{
          longitude: 32.765,
          latitude: 3.508,
          zoom: zoom,
        }}
        interactiveLayerIds={interactiveLayerIds}
        style={{
          width: mapWidth,
          height: "100vh",
          zIndex: "50",
          marginRight: sideBar ? "250px" : 0,
          marginLeft: rightSideBar ? "350px" : 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onClick={handleClick}
      >
        <NavigationControl
          showCompass={true}
          showZoom={true}
          visualizePitch={true}
          position="bottom-right"
        />

        {/* <GeolocateControl position="bottom-right" />
        <FullscreenControl position="bottom-right" />
        
        <ScaleControl />*/}
        <MapLayers />

        {children}
      </Map>
    </section>
  );
};

export default MapInterface;

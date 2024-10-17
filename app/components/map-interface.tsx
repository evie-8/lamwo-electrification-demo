"use client";

import Map, { NavigationControl } from "react-map-gl";
import MapLayers from "./layers/map-layers";
import { MapMouseEvent } from "react-map-gl";
import { useEffect, useState } from "react";
import { useMapContext } from "../providers/map-provider";
import villages from "@/public/villages.json";
import ResetControl from "./reset-control";
import { interactiveLayerIds } from "@/constants";
import {
  getVillageSources,
  handleFeatureSelection,
} from "@/lib/highlight-features";
import useWindowDimensions from "@/hooks/window-dimensions";
import SideBarToggles from "./home/toggle-sidebar";

const MapInterface = () => {
  const { width } = useWindowDimensions();
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

    const feature = features?.filter(
      (f) => f.layer?.id === "lamwo_villages"
    )[0];

    if (feature) {
      const results = handleFeatureSelection(
        mapRef,
        feature,
        selectedFeature,
        filteredBuildings
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
      const sources = getVillageSources(selectedFeature);
      sources.forEach((source) => {
        current?.setFeatureState(
          {
            source: source,
            id: Number(selectedFeature.id),
          },
          {
            click: false,
          }
        );
      });
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
    <section className={`map-container ${width < 1024 ? "hidden" : "block"}`}>
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
        <SideBarToggles />
      </Map>
    </section>
  );
};

export default MapInterface;

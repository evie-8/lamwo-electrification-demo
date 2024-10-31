"use client";

import Map, { NavigationControl } from "react-map-gl";
import MapLayers from "./layers/map-layers";
import { MapMouseEvent } from "react-map-gl";
import { useEffect } from "react";
import { useMapContext } from "../providers/map-provider";
import villages from "@/public/villages.json";
import ResetControl from "./reset-control";
import { interactiveLayerIds } from "@/constants";
import { handleFeatureSelection } from "@/lib/highlight-features";
import useWindowDimensions from "@/hooks/window-dimensions";
import SideBarToggles from "./home/toggle-sidebar";

const MapInterface = () => {
  const { width } = useWindowDimensions();

  const {
    mapRef,
    setMapRef,
    selectedFeature,
    setSelectedFeature,
    filteredBuildings,
    setFilteredBuildings,
    setDetailsVillage,
    setScreen,
    sideBar,
    rightSideBar,
  } = useMapContext();

  const current = mapRef?.current;
  const map = current?.getMap();

  let mapWidth = `100vw`;
  let zoom = 8.7;
  let marginLeft = `250px`;
  let marginRight = `350px`;

  if (width > 1350) {
    if (rightSideBar && sideBar) {
      mapWidth = `calc(100vw - 700px)`;

      if (width > 1500) {
        zoom = 9;
      } else {
        zoom = 8.7;
      }
      marginLeft = `300px`;
      marginRight = `400px`;
    } else if (rightSideBar) {
      mapWidth = `calc(100vw -  400px)`;
      marginRight = `400px`;
      zoom = 9;
    } else if (sideBar) {
      mapWidth = `calc(100vw - 300px)`;
      marginLeft = `300px`;
      zoom = 9;
    } else {
      mapWidth = `100vw`;
      zoom = 9.1;
    }
  } else {
    if (rightSideBar && sideBar) {
      mapWidth = `calc(100vw - 600px)`;

      zoom = 8.7;
    } else if (rightSideBar) {
      mapWidth = `calc(100vw - 350px)`;

      zoom = 9;
    } else if (sideBar) {
      mapWidth = `calc(100vw - 250px)`;

      zoom = 9;
    } else {
      mapWidth = `100vw`;

      zoom = 9.1;
    }
  }

  const handleClick = (event: MapMouseEvent) => {
    const features = event.features;

    const feature = features?.filter(
      (f) => f.layer?.id === "lamwo_villages"
    )[0];

    if (feature) {
      if (current) {
        const results = handleFeatureSelection(
          current,
          feature,
          selectedFeature,
          filteredBuildings
        );

        setFilteredBuildings(results?.newFilteredBuildings);
        setSelectedFeature(results?.newSelectedFeature);
      }

      const village = villages.find((village) => village.ID === feature.id);
      setDetailsVillage(village);
      setScreen("Villages Details");
    }
  };

  useEffect(() => {
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

    if (current) {
      map?.addControl(centerControl, "bottom-right");
    } // Clean up the control on unmount

    return () => {
      if (current) {
        map?.removeControl(centerControl);
      }
    };
  }, [current, map, selectedFeature, zoom]);

  useEffect(() => {
    if (map) {
      map.resize(); // Call resize on the map when sidebars change
    }
  }, [sideBar, rightSideBar, map]);

  return (
    <section className={`map-container ${width < 1024 ? "hidden" : "flex"}`}>
      <Map
        ref={(ref) => setMapRef(ref)}
        trackResize={true}
        mapboxAccessToken="pk.eyJ1IjoiZW13ZWJhemUiLCJhIjoiY2w2OHRpMzI5MGJhNDNkcGUycjVoYmZoNiJ9.XngKi9j4uHqN0iiJSlMyhQ"
        initialViewState={{
          longitude: 32.765,
          latitude: 3.508,
          zoom: zoom,
          pitch: 0,
        }}
        //maxZoom={13}
        minZoom={8.7}
        interactiveLayerIds={interactiveLayerIds}
        pitchWithRotate={false}
        dragRotate={false}
        style={{
          width: mapWidth,
          height: "100%",
          marginRight: sideBar ? marginLeft : 0,
          marginLeft: rightSideBar ? marginRight : 0,
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        onClick={handleClick}
      >
        <NavigationControl showZoom={true} position="bottom-right" />
        <MapLayers />
        <SideBarToggles />
      </Map>
    </section>
  );
};

export default MapInterface;

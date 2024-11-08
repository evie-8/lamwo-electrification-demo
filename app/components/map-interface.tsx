"use client";

import { useCallback, useEffect, useState } from "react";
import Map, { NavigationControl, MapMouseEvent } from "react-map-gl";
import MapLayers from "@/app/components/layers/map-layers";
import { useMapContext } from "@/app/providers/map-provider";
import villages from "@/public/villages.json";
import ResetControl from "@/app/components/reset-control";
import { interactiveLayerIds } from "@/constants";
import { handleFeatureSelection } from "@/lib/highlight-features";
import useWindowDimensions from "@/hooks/window-dimensions";
import SideBarToggles from "@/app/components/home/toggle-sidebar";

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
  const [zoom, setZoom] = useState<number>(8.7);
  const current = mapRef?.current;
  const map = current?.getMap();

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

  const centerMap = useCallback(() => {
    map?.flyTo({
      center: [32.765, 3.508],
      zoom: zoom,
      essential: true,
      animate: true,
    });
  }, [map, zoom]);

  useEffect(() => {
    const centerMapButton = () => {
      centerMap();
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

    const centerControl = new ResetControl({ eventHandler: centerMapButton });

    if (current) {
      map?.addControl(centerControl, "bottom-right");
    } // Clean up the control on unmount

    return () => {
      if (current) {
        map?.removeControl(centerControl);
      }
    };
  }, [current, map, selectedFeature, centerMap]);

  useEffect(() => {
    if (map) {
      if (!selectedFeature) {
        map.resize(); // Call resize on the map when sidebars change
        centerMap();
      } else {
        map.resize();
      }
    }
  }, [sideBar, rightSideBar, map, selectedFeature, centerMap]);

  useEffect(() => {
    let newZoom = zoom;

    if (rightSideBar && sideBar) {
      newZoom = width > 1500 ? 9.2 : 8.7;
    } else if (rightSideBar || sideBar) {
      newZoom = 9;
    } else {
      newZoom = 9.1;
    }
    if (newZoom !== zoom) {
      setZoom(newZoom);
    }
  }, [width, rightSideBar, sideBar, zoom]);

  return (
    <section
      className={`map-container ${width < 1024 ? "hidden" : "flex"} ${
        rightSideBar && sideBar
          ? "active"
          : sideBar
          ? "leftSideBar"
          : rightSideBar
          ? "rightSideBar"
          : "w-full"
      }`}
    >
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
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
import { interactiveLayerIds } from "@/constants";

interface MapProps {
  children?: React.ReactNode;
}

const MapInterface: React.FC<MapProps> = ({ children }) => {
  const { mapRef, setMapRef } = useMapContext();
  const [selectedFeature, setSelectedFeature] = useState<
    Feature | null | undefined
  >(null);
  const [filteredBuildings, setFilteredBuildings] = useState<Feature[] | null>(
    null
  );
  const current = mapRef.current;
  const map = current?.getMap();

  const handleClick = (event: MapMouseEvent) => {
    const features = event.features;
    const sources = features?.map((f) => f.source);

    const feature = features?.filter(
      (f) => f.layer?.id === "lamwo_villages"
    )[0];

    if (feature) {
      const village = villages.filter(
        (village) => village.ID === feature.id
      )[0];
      console.log("village", village);

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

      mapRef.current?.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 20, duration: 1000 }
      );

      if (selectedFeature) {
        sources?.forEach((source: string) => {
          current?.setFeatureState(
            { source: source, id: Number(selectedFeature?.id) },
            { click: false }
          );
        });
      }
      setSelectedFeature(feature);
      sources?.forEach((source) => {
        current?.setFeatureState(
          { source: source, id: Number(feature.id) },
          { click: true }
        );
      });

      const buildingsFiltered = current?.querySourceFeatures(
        "lamwo_buildings",
        {
          //@ts-ignore
          filter: boundsFilter,
        }
      );
      console.log(buildingsFiltered);
      if (buildingsFiltered) {
        if (filteredBuildings) {
          filteredBuildings.map((building: any) => {
            current?.setFeatureState(
              {
                source: "lamwo_buildings",
                id: building.id,
              },
              {
                visible: false,
              }
            );
          });
        }
        setFilteredBuildings(buildingsFiltered);
        buildingsFiltered.map((building) => {
          current?.setFeatureState(
            {
              source: "lamwo_buildings",
              id: Number(building.id),
            },
            {
              visible: true,
            }
          );
        });
      }
    }
  };

  const centerMap = () => {
    map?.flyTo({
      center: [32.765, 3.508],
      zoom: 8.7,
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
  return (
    <section className="map-container">
      <Map
        ref={(ref) => setMapRef(ref)}
        mapboxAccessToken="pk.eyJ1IjoiZW13ZWJhemUiLCJhIjoiY2w2OHRpMzI5MGJhNDNkcGUycjVoYmZoNiJ9.XngKi9j4uHqN0iiJSlMyhQ"
        initialViewState={{
          longitude: 32.765,
          latitude: 3.508,
          zoom: 8.7,
        }}
        interactiveLayerIds={interactiveLayerIds}
        style={{
          width: `calc(100vw - 600px)`,
          height: "100vh",
          zIndex: "5",
          marginLeft: "350px",
          marginRight: "250px",
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

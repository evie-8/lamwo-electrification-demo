"use client";

import { useState } from "react";
import { Marker, Popup, Source, Layer, LngLatLike } from "react-map-gl";
import Image from "next/image";
import { Feature, MultiPoint } from "geojson";
import { useMapContext } from "@/app/providers/map-provider";
import { createCircle } from "@/utils";

type PopupState = {
  [key: string]: boolean;
};

interface MarkersProps {
  data: Feature<MultiPoint>[];
}

const MarkersWrapper: React.FC<MarkersProps> = ({ data }) => {
  const [popupOpen, setPopupOpen] = useState<PopupState>({});
  const [circleData, setCircleData] = useState<Feature | null>(null);
  const { mapRef } = useMapContext();

  const handleMarkerClick = (feature: Feature<MultiPoint>) => {
    const coords = feature?.geometry?.coordinates[0];
    if (coords && mapRef?.current) {
      const center: LngLatLike = [coords[0], coords[1]];
      setCircleData(createCircle(center));

      // Fly to the clicked marker's location with a smooth transition
      mapRef.current.flyTo({
        center,
        zoom: 14.3, // Adjust the zoom level as needed
        essential: true, // Makes the animation smooth
      });

      setPopupOpen({ [feature?.properties?.ID]: true });
    }
  };

  return (
    <>
      {data.map((feature, i: number) => (
        <Marker
          key={i}
          anchor="center"
          longitude={feature?.geometry?.coordinates[0][0]}
          latitude={feature?.geometry?.coordinates[0][1]}
          onClick={(e) => {
            e.originalEvent.stopPropagation();
            handleMarkerClick(feature);
          }}
        >
          <Image
            src={
              feature?.properties?.grid_type === "candidate"
                ? "/candidate-mini-grid.png"
                : "/existing-mini-grid.png"
            }
            width={30}
            height={30}
            alt={
              feature?.properties?.grid_type === "candidate"
                ? "candidate mini grid icon"
                : "existing mini grid icon"
            }
            unoptimized={true}
          />
          {popupOpen[feature?.properties?.ID] && (
            <Popup
              anchor="bottom"
              longitude={feature?.geometry?.coordinates[0][0]}
              latitude={feature?.geometry?.coordinates[0][1]}
              onClose={() => {
                setPopupOpen((prev) => ({
                  ...prev,
                  [feature?.properties?.ID]: false,
                }));
                setCircleData(null);
              }}
              closeButton={true}
            >
              {/* Green top bar */}
              <span />

              {/* Popup content */}

              {feature.properties?.grid_type === "candidate" ? (
                <div>
                  <strong>Name: {feature?.properties?.Name}</strong>
                  <p>
                    <strong>Population: </strong>
                    {feature?.properties?.Population}
                  </p>
                </div>
              ) : (
                <div>
                  <strong>Name: {feature?.properties?.Site_name}</strong>
                  <p>
                    <strong>Category: </strong>
                    {feature?.properties?.Category}
                  </p>
                  {/* Add conditional display for Remarks if needed */}
                  {feature?.properties?.Remarks && (
                    <p>
                      <strong>Details:</strong> {feature?.properties?.Remarks}
                    </p>
                  )}

                  <p className="capacity-tag">
                    <strong>Capacity:</strong>
                    {feature?.properties?.Capacity}
                  </p>
                </div>
              )}
            </Popup>
          )}
        </Marker>
      ))}

      {circleData && (
        <Source id="circle-source" type="geojson" data={circleData}>
          <Layer
            id="circle-layer"
            type="fill"
            paint={{
              "fill-color": "rgba(0, 0, 0, 0.2)",
              "fill-outline-color": "rgba( 0, 0, 0, 1)",
            }}
          />
        </Source>
      )}
    </>
  );
};

export default MarkersWrapper;

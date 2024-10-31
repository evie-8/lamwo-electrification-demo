import { useEffect } from "react";
import { Layer, Source } from "react-map-gl";
import { useMapContext } from "../../providers/map-provider";
import { iconNames, iconUrls } from "@/constants";

const BuildingLayers = () => {
  const { mapRef } = useMapContext();

  useEffect(() => {
    if (!mapRef?.current) return;

    const map = mapRef?.current.getMap();
    // Load icons and add them to the map

    map.on("load", () => {
      iconUrls.forEach((url, index) => {
        map.loadImage(
          url,
          (
            error,
            image: ImageBitmap | HTMLImageElement | ImageData | null | undefined
          ) => {
            if (error) throw error;
            if (!map.hasImage(iconNames[index])) {
              map.addImage(
                iconNames[index],
                image as ImageBitmap | HTMLImageElement | ImageData
              );
            }
          }
        );
      });
    });
  }, [mapRef]);

  return (
    <>
      <Source
        id="lamwo_buildings"
        type="geojson"
        data={"geojson_maps/lamwo_buildings.geojson"}
        promoteId="fid"
      >
        <Layer
          id="school_buildings"
          type="symbol"
          source="lamwo_buildings"
          filter={["==", ["get", "category"], "school"]}
          layout={{
            "icon-image": "school-icon",
            "icon-size": 0.06,
            "icon-allow-overlap": true,
          }}
          paint={{
            "icon-opacity": [
              "case",
              ["boolean", ["feature-state", "visible"], false],
              1,
              0,
            ],
          }}
        />

        <Layer
          id="health_facility_buildings"
          type="symbol"
          source="lamwo_buildings"
          filter={["==", ["get", "category"], "health facility"]}
          layout={{
            "icon-image": "hospital-icon",
            "icon-size": 0.06,
            "icon-allow-overlap": true,
          }}
          paint={{
            "icon-opacity": [
              "case",
              ["boolean", ["feature-state", "visible"], false],
              1,
              0,
            ],
          }}
        />

        <Layer
          id="commercial_buildings"
          type="symbol"
          source="lamwo_buildings"
          filter={["==", ["get", "category"], "commercial"]}
          layout={{
            "icon-image": "commercial-icon",
            "icon-size": 0.06,
            "icon-allow-overlap": true,
          }}
          paint={{
            "icon-opacity": [
              "case",
              ["boolean", ["feature-state", "visible"], false],
              1,
              0,
            ],
          }}
        />

        <Layer
          id="administrative_buildings"
          type="symbol"
          source="lamwo_buildings"
          filter={["==", ["get", "category"], "administrative"]}
          layout={{
            "icon-image": "administrative-icon",
            "icon-size": 0.06,
            "icon-allow-overlap": true,
          }}
          paint={{
            "icon-opacity": [
              "case",
              ["boolean", ["feature-state", "visible"], false],
              1,
              0,
            ],
          }}
        />
        {/* <Layer
          id="uncategorized_buildings"
          type="fill"
          source="lamwo_buildings"
          filter={["==", ["get", "category"], null]}
          paint={{
            "fill-color": "#00f", // Color of the fill
            "fill-opacity": 0.3, // Opacity of the fill
          }}
        /> */}
        <Layer
          id="uncategorized_buildings"
          type="line"
          source="lamwo_buildings"
          filter={["==", ["get", "category"], null]}
          paint={{
            "line-color": "#00f", // Color of the outline (black)
            "line-width": 1.5, // Increase the width of the outline (adjust this value for size)
            "line-opacity": 1, // Full opacity for the outline
          }}
        />
      </Source>
    </>
  );
};

export default BuildingLayers;

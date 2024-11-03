import { useEffect } from "react";
import { Layer, Source } from "react-map-gl";
import { useMapContext } from "@/app/providers/map-provider";

const GridLayers = () => {
  const { mapRef } = useMapContext();

  useEffect(() => {
    if (!mapRef?.current) return;

    const map = mapRef.current.getMap();

    // Wait until the map has loaded
    map.on("load", () => {
      //Add images for icons once the map is loaded
      map.loadImage(
        "/location1.png",
        (
          error,
          image: ImageBitmap | HTMLImageElement | ImageData | null | undefined
        ) => {
          if (error) throw error;
          if (!map.hasImage("mini-grid-icon")) {
            map.addImage(
              "mini-grid-icon",
              image as ImageBitmap | HTMLImageElement | ImageData
            );
          }
        }
      );

      map.loadImage(
        "/location.png",
        (
          error,
          image: ImageBitmap | HTMLImageElement | ImageData | null | undefined
        ) => {
          if (error) throw error;
          if (!map.hasImage("candidate-icon")) {
            map.addImage(
              "candidate-icon",
              image as ImageBitmap | HTMLImageElement | ImageData
            );
          }
        }
      );
    });
  }, [mapRef]);

  return (
    <>
      <Source
        id="candidate_MGs"
        type="geojson"
        data="/geojson_maps/Candidate-MGs.geojson"
      >
        <Layer
          id="candidate_MGs_layer"
          type="symbol"
          source="candidate_MGs"
          layout={{
            "icon-image": "candidate-icon",
            "icon-size": 0.06,
            "icon-anchor": "center",
            "icon-allow-overlap": true,
          }}
        />
      </Source>
      <Source
        id="Existing_MGs"
        type="geojson"
        data="/geojson_maps/Existing-MGs.geojson"
      >
        <Layer
          id="existing_MGs_layer"
          type="symbol"
          source="Existing_MGs"
          layout={{
            "icon-image": "mini-grid-icon",
            "icon-size": 0.06,
            "icon-anchor": "center",
            "icon-allow-overlap": true,
          }}
        />
      </Source>
    </>
  );
};

export default GridLayers;

import { useEffect } from "react";
import { useMapContext } from "../../providers/map-provider";
import { Layer, Source } from "react-map-gl";

const GridLayers = () => {
  const { mapRef } = useMapContext();

  useEffect(() => {
    if (!mapRef?.current) return;

    const map = mapRef.current.getMap();

    // Wait until the map has loaded
    map.on("load", () => {
      // Add images for icons once the map is loaded
      map.loadImage("/location1.png", (error, image: any) => {
        if (error) throw error;
        if (!map.hasImage("mini-grid-icon")) {
          map.addImage("mini-grid-icon", image);
        }
      });

      map.loadImage("/location.png", (error, image: any) => {
        if (error) throw error;
        if (!map.hasImage("candidate-icon")) {
          map.addImage("candidate-icon", image);
        }
      });

      // Safely add layers after the map has fully loaded
      if (!map.getLayer("existing_MGs_layer")) {
        map.addLayer({
          id: "existing_MGs_layer",
          type: "symbol",
          source: "Existing_MGs",
          layout: {
            "icon-image": "mini-grid-icon",
            "icon-size": 0.06,
            "icon-anchor": "center",
            "icon-allow-overlap": true,
          },
        });
      }

      if (!map.getLayer("candidate_MGs_layer")) {
        map.addLayer({
          id: "candidate_MGs_layer",
          type: "symbol",
          source: "candidate_MGs",
          layout: {
            "icon-image": "candidate-icon",
            "icon-size": 0.06,
            "icon-anchor": "center",
            "icon-allow-overlap": true,
          },
        });
      }
    });

    // Clean up event listeners when the component unmounts
    return () => {
      map.off("load");
    };
  }, [mapRef]);

  return (
    <>
      <Source
        id="candidate_MGs"
        type="geojson"
        data="/geojson_maps/Candidate-MGs.geojson"
      />
      <Source
        id="Existing_MGs"
        type="geojson"
        data="/geojson_maps/Existing-MGs.geojson"
      />
    </>
  );
};

export default GridLayers;

import { Layer, Source } from "react-map-gl";
import { useEffect } from "react";
import { useMapContext } from "../map-provider";

const sources = [
  {
    source_id: "candidate_MGs",
    source_config: {
      type: "geojson",
      promoteId: "ID",
      data: "/geojson_maps/Candidate-MGs.geojson",
    },
  },
  {
    source_id: "Existing_MGs",
    source_config: {
      type: "geojson",
      promoteId: "ID",
      data: "/geojson_maps/Existing-MGs.geojson",
    },
  },
];

const GridLayers = () => {
  const { mapRef } = useMapContext();

  useEffect(() => {
    if (!mapRef?.current) return;

    const map = mapRef.current.getMap();

    map.on("load", () => {
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
    });
  }, [mapRef]);

  return (
    <>
      {sources.map((source) => (
        <Source
          key={source.source_id}
          id={source.source_id}
          {...source.source_config}
        />
      ))}

      <Layer
        id="candidate_MGs_layer"
        type="symbol"
        source="candidate_MGs"
        layout={{
          "icon-image": "candidate-icon",
          "icon-size": 0.06,
          "icon-anchor": "center",
          "icon-allow-overlap": true,
          visibility: "none",
        }}
      />

      <Layer
        id="existing_MGs_layer"
        type="symbol"
        source="Existing_MGs"
        layout={{
          "icon-image": "mini-grid-icon",
          "icon-size": 0.06,
          "icon-anchor": "center",
          "icon-allow-overlap": true,
          visibility: "none",
        }}
      />
    </>
  );
};

export default GridLayers;

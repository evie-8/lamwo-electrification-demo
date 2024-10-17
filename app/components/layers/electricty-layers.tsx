import { Source, Layer } from "react-map-gl";

const GridElectricityLayer = () => {
  return (
    <Source
      id="grid"
      type="geojson"
      data={"/geojson_maps/grid-existing.geojson"}
      promoteId="ID"
    >
      <Layer
        id="grid_electricity"
        type="line"
        source="grid"
        layout={{
          "line-cap": "round",
          "line-join": "round",
        }}
        paint={{
          "line-color": "#FFFFFF",
          "line-width": 2,
          "line-dasharray": [1, 2],
        }}
      />
    </Source>
  );
};

export default GridElectricityLayer;

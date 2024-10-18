import { Layer, Source } from "react-map-gl";

const VillageLayers = () => {
  return (
    <Source
      id="id_lamwovillages"
      type="geojson"
      data={"geojson_maps/lamwo_villages.geojson"}
      promoteId="ID"
    >
      <Layer
        id="lamwo_villages"
        type="fill"
        source="id_lamwovillages"
        paint={{
          "fill-color": "#D3D3D3",
          //1e90ff
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            0.3,
            0.4,
          ],
        }}
      />
      <Layer
        id="village_name"
        type="symbol"
        source="id_lamowvillages"
        layout={{
          "text-field": ["get", "addr_vname"],
          "text-size": 12,
          "text-offset": [0, 0.6],
          "text-anchor": "center",
        }}
        paint={{
          "text-color": "#000000",
          "text-halo-color": "#ffffff",
          "text-halo-width": 1,
          "text-opacity": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            1,
            0,
          ],
        }}
      />
      <Layer
        id="lamwo_villages_outline"
        type="line"
        source="id_lamwovillages"
        paint={{
          "line-color": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            "#000",
            "#696969",
          ],
          "line-width": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            1.5,
            0.5,
          ],
        }}
      />
    </Source>
  );
};

export default VillageLayers;

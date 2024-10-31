import { Layer, Source } from "react-map-gl";

const VillageLayers = () => {
  return (
    <Source
      id="id_lamwovillages"
      type="geojson"
      data={"/geojson_maps/mergedfile.geojson"}
      promoteId="ID"
    >
      <Layer
        id="lamwo_villages"
        type="fill"
        source="id_lamwovillages"
        paint={{
          "fill-color": [
            "case",
            // Case for solar home systems
            ["==", ["get", "category"], "candidate_for_solar_home_systems"],
            "#CCC",
            // Case for candidate minigrid sites
            ["==", ["get", "category"], "candidate_minigrid_site"],
            "#4682B4",
            // Case for existing minigrid sites
            ["==", ["get", "category"], "existing_minigrid_site"],
            "#3CB371",
            // Case for grid extension
            ["==", ["get", "category"], "grid_extension"],
            "#FF7F50",
            // Default color if no match found
            "#D3D3D3", // Black or any default color you choose
          ],
          "fill-opacity": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            0.3,
            1,
          ],
          "fill-outline-color": [
            "case",
            ["boolean", ["feature-state", "click"], false],
            "#000",
            "#696969",
          ],
        }}
      />
      {/* <Layer
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
      /> */}
      {/* <Layer
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
      /> */}
    </Source>
  );
};

export default VillageLayers;

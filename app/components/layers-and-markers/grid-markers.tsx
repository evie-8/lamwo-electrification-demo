import { Feature, MultiPoint } from "geojson";
import existing_MGS from "@/public/geojson_maps/Existing-MGs.geojson";
import candidate_MGS from "@/public/geojson_maps/Candidate-MGs.geojson";
import MarkersWrapper from "@/app/components/layers-and-markers/markers";

const GridMarkers = () => {
  const combinedData = [
    ...candidate_MGS.features.map((feature: Feature<MultiPoint>) => ({
      ...feature,
      properties: {
        ...feature.properties,
        grid_type: "candidate",
      },
    })),
    ...existing_MGS.features.map((feature: Feature<MultiPoint>) => ({
      ...feature,
      properties: {
        ...feature.properties,
        grid_type: "existing",
      },
    })),
  ];
  return <MarkersWrapper data={combinedData} />;
};

export default GridMarkers;

import { categoryVillagesLayers, categoryVillagesSources } from "@/constants";
import { Source, Layer } from "react-map-gl";

const VillageCategoryLayers = () => {
  return (
    <>
      {/* Render sources */}
      {categoryVillagesSources.map((source) => (
        <Source
          key={source.source_id}
          id={source.source_id}
          {...source.source_config}
        />
      ))}

      {/* Render layers */}
      {categoryVillagesLayers.map((layer) => (
        <Layer key={layer.id} {...layer} />
      ))}
      
    </>
  );
};

export default VillageCategoryLayers;

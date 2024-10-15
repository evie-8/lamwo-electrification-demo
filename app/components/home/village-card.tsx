import { ChevronRightCircle } from "lucide-react";
import React from "react";
import { useMapContext } from "../map-provider";
import { Feature } from "geojson";
//@ts-ignore
import geoData from "@/public/geojson_maps/lamwo_villages.geojson";
import { handleFeatureSelection } from "@/utils";
import { categoriesVillages } from "@/constants";

interface Props {
  data: any;
}
const VillageCard = ({ data }: Props) => {
  const {
    mapRef,
    filteredBuildings,
    setFilteredBuildings,
    selectedFeature,
    setSelectedFeature,
    setScreen,
    setDetailsVillage,
  } = useMapContext();

  const category = categoriesVillages.filter(
    (cat) => cat.category === data.NES_category
  )[0];

  const feature = geoData.features.find(
    (village: Feature) => village?.properties?.ID === data.ID
  );
  const handleClick = () => {
    console.log("feature", feature);
    if (feature) {
      feature.id = data.ID;
      const results = handleFeatureSelection(
        mapRef,
        feature,
        selectedFeature,
        filteredBuildings,
        [category.source_id, "id_lamwovillages"]
      );
      setFilteredBuildings(results?.newFilteredBuildings);
      setSelectedFeature(results?.newSelectedFeature);
    }
    setScreen("Villages Details");
    setDetailsVillage(data);
  };

  return (
    <div className="card-item group dl-3" onClick={handleClick}>
      <div className="card-item-content">
        <div className="card-info">
          <span>
            <strong>{data.village}</strong>
          </span>
          <div className="tag-row mt-2">
            <p
              style={{
                backgroundColor: category.color,
                borderColor: category.color,
              }}
              className={`flex w-fit  rounded-full py-[1px] px-2 border text-white font-semibold `}
            >
              {category.text}
            </p>
          </div>
        </div>
      </div>
      <ChevronRightCircle
        size={25}
        fontWeight={700}
        className="text-highlight-blue my-auto group-hover:opacity-35"
      />
    </div>
  );
};

export default VillageCard;

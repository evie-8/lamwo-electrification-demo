import { ChevronRightCircle } from "lucide-react";
import React from "react";
import { useMapContext } from "../map-provider";
import { Feature } from "geojson";
//@ts-ignore
import geoData from "@/public/geojson_maps/lamwo_villages.geojson";
import { handleFeatureSelection } from "@/lib/highlight-features";
import { categoriesVillages } from "@/constants";
import useWindowDimensions from "@/hooks/window-dimensions";

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

  const { width } = useWindowDimensions();
  //obtain category for the village
  const category = categoriesVillages.filter(
    (cat) => cat.category === data.NES_category
  )[0];

  //extract feature from geodata
  const feature = geoData.features.find(
    (village: Feature) => village?.properties?.ID === data.ID
  );

  //changes screen display and highlights vilage on the map
  const handleClick = () => {
    console.log("feature", feature);

    if (feature && width >= 1024) {
      feature.id = data.ID;
      const results = handleFeatureSelection(
        mapRef,
        feature,
        selectedFeature,
        filteredBuildings
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
          <span className="font-semibold">{data.village}</span>
          <div className="tag-row mt-2">
            <p
              style={{
                backgroundColor: category.color,
                borderColor: category.color,
              }}
              className={`flex items-center justify-center w-fit rounded-full py-[0.5px] px-2 border text-xs text-white font-medium `}
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

import { ChevronRight } from "lucide-react";
import { Feature } from "geojson";
import geoData from "@/public/geojson_maps/lamwo_villages.geojson";
import styles from "@/app/styles/village-card.module.css";
import { useMapContext } from "@/app/providers/map-provider";
import { handleFeatureSelection } from "@/lib/highlight-features";
import { categoriesVillages } from "@/constants";
import useWindowDimensions from "@/hooks/window-dimensions";
import { VillageData } from "@/types";

interface Props {
  data: VillageData;
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
      if (mapRef?.current) {
        const results = handleFeatureSelection(
          mapRef.current,
          feature,
          selectedFeature,
          filteredBuildings
        );
        setFilteredBuildings(results?.newFilteredBuildings);
        setSelectedFeature(results?.newSelectedFeature);
      }
    }
    setScreen("Villages Details");
    setDetailsVillage(data);
  };

  return (
    <div className={`${styles.card_item} group`} onClick={handleClick}>
      <div className={styles.card_item_content}>
        <div className={styles.card_info}>
          <span>{data.village}</span>
          <div className={styles.tag_row}>
            <p
              style={{
                backgroundColor: category.color,
                borderColor: category.color,
              }}
            >
              {category.text}
            </p>
          </div>
        </div>
      </div>
      <ChevronRight
        size={25}
        fontWeight={700}
        className={`${styles.icon} group-hover:opacity-35`}
      />
    </div>
  );
};

export default VillageCard;

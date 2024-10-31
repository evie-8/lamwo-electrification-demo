import styles from "@/app/styles/filter-category.module.css";
import { Eye, EyeOff } from "lucide-react";
import { FilterSpecification } from "mapbox-gl";
import Image from "next/image";
import { MapRef } from "react-map-gl";

interface Props {
  title: string;
  items: Array<{ id: string; text: string; url?: string; color?: string }>;
  mapRef: React.MutableRefObject<MapRef | null> | null | undefined;
  layerVisibility: {
    [key: string]: boolean;
  };
  setLayerVisibility: React.Dispatch<
    React.SetStateAction<{ [key: string]: boolean }>
  >;
}

export const categoryColorMapping: { [key: string]: string } = {
  candidate_for_solar_home_systems: "#CCC",
  candidate_minigrid_site: "#4682B4",
  existing_minigrid_site: "#3CB371",
  grid_extension: "#FF7F50",
  default: "transparent", //"#F6F6F4",
};

const FilterCategory = ({
  title,
  items,
  mapRef,
  setLayerVisibility,
  layerVisibility,
}: Props) => {
  const toggleLayerVisibility = (layer: string) => {
    const map = mapRef?.current?.getMap();
    const newVisibility = !layerVisibility[layer]; // Toggle visibility state
    const filteredLayer = categoryColorMapping[layer];

    if (filteredLayer) {
      setLayerVisibility((prev) => ({
        ...prev,
        [layer]: newVisibility,
      }));

      // Build a color expression that applies colors based on each category’s visibility state
      const colorExpression: FilterSpecification = [
        "match",
        ["get", "category"],
      ];

      // Apply each category color based on its visibility
      items.forEach((item) => {
        const isVisible =
          item.id === layer ? newVisibility : layerVisibility[item.id];
        colorExpression.push(
          item.id,
          isVisible
            ? categoryColorMapping[item.id]
            : categoryColorMapping.default
        );
      });

      // Add a default color at the end of the expression
      colorExpression.push(categoryColorMapping.default);

      // Apply the color expression to the layer
      map?.setPaintProperty("lamwo_villages", "fill-color", colorExpression);
    } else {
      // Set the visibility of the layer
      map?.setLayoutProperty(
        layer,
        "visibility",
        newVisibility ? "visible" : "none"
      );
    }

    // Update local state to reflect visibility change
    setLayerVisibility((prev) => ({
      ...prev,
      [layer]: newVisibility,
    }));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>{title}</p>
      {items.map((item) => (
        <div className={styles.filter_container} key={item.id}>
          <p>
            {item.url && (
              <Image src={item.url} width={10} height={10} alt="icon" />
            )}
            {!item.url && item.color && (
              <span style={{ backgroundColor: item.color }} />
            )}
            <span>{item.text}</span>
          </p>
          <button onClick={() => toggleLayerVisibility(item.id)}>
            {layerVisibility[item.id] ? (
              <Eye size={17} className="text-green-500" />
            ) : (
              <EyeOff size={17} />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default FilterCategory;

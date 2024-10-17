import styles from "@/app/styles/filter-category.module.css";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

import { MapRef } from "react-map-gl";

interface Props {
  title: string;
  items: Array<{ id: string; text: string; url?: string; color?: string }>;
  mapRef: MapRef | null | undefined;
  layerVisibility: {
    [key: string]: boolean;
  };
  setLayerVisibility: any;
}

const FilterCategory = ({
  title,
  items,
  mapRef,
  setLayerVisibility,
  layerVisibility,
}: Props) => {
  const toggleLayerVisibility = (layer: string) => {
    //@ts-ignore
    const map = mapRef?.current?.getMap();
    const newVisibility = !layerVisibility[layer]; // Toggle visibility state

    // Set the visibility of the layer
    map.setLayoutProperty(
      layer,
      "visibility",
      newVisibility ? "visible" : "none"
    );

    // Update local state to reflect visibility change
    setLayerVisibility((prev: []) => ({
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

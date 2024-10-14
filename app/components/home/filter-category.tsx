import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";

import { MapRef } from "react-map-gl";

interface Props {
  title: string;
  items: Array<{ id: string; text: string; url?: string; color?: string }>;
  mapRef: MapRef;
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
    <div className="flex flex-col mb-4">
      <p className="text-[14px] font-semibold border-b pb-1 text-sunbird-navy-blue mb-2">
        {title}
      </p>
      {items.map((item) => (
        <div className="flex items-center justify-between my-[5px]" key={item.id}>
          <p className="flex items-center">
            {item.url && (
              <Image
                src={item.url}
                className="w-5 h-5"
                width={10}
                height={10}
                alt="icon"
              />
            )}
            {!item.url && item.color && (
              <span
                className={"h-4 border w-4 inline-block`"}
                style={{ backgroundColor: item.color }}
              />
            )}
            <span className="pl-2 text-[13px]">{item.text}</span>
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

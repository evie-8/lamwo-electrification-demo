import VillageCategoryLayers from "./village-category-layers";
import VillageLayers from "./village-layers";
import BuildingLayers from "./buildings-layers";
import GridLayers from "./grid-layers";
import GridElectricityLayer from "./electricty-layers";

const MapLayers = () => {
  return (
    <>
      <VillageLayers />
      <VillageCategoryLayers />
      <GridElectricityLayer />
      <GridLayers />
      <BuildingLayers />
    </>
  );
};

export default MapLayers;

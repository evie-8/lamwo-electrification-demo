import VillageLayers from "@/app/components/layers/village-layers";
import BuildingLayers from "@/app/components/layers/buildings-layers";
import GridLayers from "@/app/components/layers/grid-layers";
import GridElectricityLayer from "@/app/components/layers/electricty-layers";

const MapLayers = () => {
  return (
    <>
      <VillageLayers />
      <BuildingLayers />
      <GridElectricityLayer />
      <GridLayers />
    </>
  );
};

export default MapLayers;

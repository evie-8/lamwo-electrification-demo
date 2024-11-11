import VillageLayers from "@/app/components/layers-and-markers/village-layers";
import BuildingLayers from "@/app/components/layers-and-markers/buildings-layers";
import GridMarkers from "@/app/components/layers-and-markers/grid-markers";
import GridElectricityLayer from "@/app/components/layers-and-markers/electricty-layers";

const MapLayers = () => {
  return (
    <>
      <VillageLayers />
      <BuildingLayers />
      <GridElectricityLayer />
      <GridMarkers />
    </>
  );
};

export default MapLayers;

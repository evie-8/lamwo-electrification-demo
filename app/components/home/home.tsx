import LayersSideBar from "@/app/components/home/layer-sidebar";
import MainSideBar from "@/app/components/home/main-sidebar";
import MapInterface from "@/app/components/map-interface";

const Home = () => {
  return (
    <>
      <MapInterface />
      <MainSideBar />
      <LayersSideBar />
    </>
  );
};

export default Home;

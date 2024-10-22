"use client";
import LayersSideBar from "./layer-sidebar";
import MainSideBar from "./main-sidebar";
import MapInterface from "../map-interface";

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

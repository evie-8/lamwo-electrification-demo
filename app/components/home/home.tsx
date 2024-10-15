"use client";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import LayersSideBar from "./layer-sidebar";
import MainSideBar from "./main-sidebar";
import { useMapContext } from "../map-provider";

const Home = () => {
  const { setSideBar, setKey, setRightSideBar, rightSideBar, sideBar } =
    useMapContext();

  return (
    <section className="">
      <MainSideBar />
      <LayersSideBar />
      <div className="flex items-center justify-between w-full z-50">
        {/* Right Side Button */}
        <button
          onClick={() => {
            setRightSideBar((prev) => !prev);
            setKey((prev) => prev + 1);
          }}
          className={`fixed top-1/2 ${
            rightSideBar ? "left-[28%]" : "left-1"
          } flex items-center justify-center p-2 bg-black/20 rounded-full shadow-lg`}
          title={rightSideBar ? "Hide details" : "Show details"}
        >
          <ChevronRightCircle
            className={`text-sunbird-navy-blue transition-all ease duration-75 hover:opacity-60 ${
              rightSideBar && "transform rotate-180"
            }`}
            fontWeight={800}
            size={30}
          />
        </button>

        {/* Left Side Button */}
        <button
          onClick={() => {
            setSideBar((prev) => !prev);
            setKey((prev) => prev + 1);
          }}
          className={`${
            sideBar ? "left-[76%]" : "left-[96%]"
          } fixed top-1/2 flex items-center justify-center p-2 bg-black/20 rounded-full shadow-lg`}
          title={rightSideBar ? "Hide filters" : "Show filters"}
        >
          <ChevronRightCircle
            className={`text-sunbird-navy-blue transition-all ease duration-75 hover:opacity-60 ${
              !sideBar && "transform rotate-180"
            }`}
            fontWeight={800}
            size={30}
          />
        </button>
      </div>
    </section>
  );
};

export default Home;

"use client";
import { Search } from "lucide-react";
import Image from "next/image";
import AboutTab from "./about";
import { useMapContext } from "../map-provider";

import ResearchTab from "./project-resources";
import Villages from "./villages";

const MainSideBar = () => {
  const { screen, setScreen } = useMapContext();
  return (
    <section className="main-sidebar">
      <>
        <nav className="fixed top-0 left-0 w-[350px] flex flex-col gap-4 pb-3 border-b px-4 bg-white z-50 shadow-md">
          <div className="flex items-center justify-start gap-4 relative my-1">
            <Image src={"/memdlogo.svg"} alt="logo" width={60} height={60} />
            <h2 className="font-extrabold text-xl text-center text-sunbird-navy-blue">
              Lamwo Electrification
            </h2>
          </div>
          <div className="relative">
            <input
              placeholder="Search village ..."
              className="bg-white shadow-md text-start outline-none border text-[14px] placeholder:text-[14px] placeholder:text-gray-950 pl-10 pr-8 rounded-md h-10 w-full block"
            />
            <Search size={20} className="absolute top-2 left-2" />
          </div>
          <p className="flex justify-between items-center text-[15px] ">
            {["Villages", "Project Resources", "About Project"].map(
              (screenName) => {
                return (
                  <span
                    className={`relative cursor-pointer ${
                      screen.toLowerCase() === screenName.toLowerCase()
                        ? " font-bold text-sunbird-navy-blue after:content-[''] after:block after:w-full after:h-1 after:bg-sunbird-navy-blue after:rounded-full after:absolute after:left-0 after:bottom-[-5px]"
                        : "font-medium"
                    }`}
                    onClick={() => setScreen(screenName)}
                  >
                    {screenName}
                  </span>
                );
              }
            )}
          </p>
        </nav>

        <section
          className={`h-[calc(10Ovh-190px)] overflow-y-auto mt-[190px] px-4 `}
        >
          {screen === "About Project" && <AboutTab />}
          {screen === "Project Resources" && <ResearchTab />}
          {screen === "Villages" && <Villages />}
        </section>
      </>
    </section>
  );
};

export default MainSideBar;

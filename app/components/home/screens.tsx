"use client";

import { ArrowLeft } from "lucide-react";
import { useMapContext } from "../map-provider";

interface Props {
  children: React.ReactNode;
}

const Screens = ({ children }: Props) => {
  const { screen, setScreen } = useMapContext();
  return (
    <div className="h-full">
      <nav className="backdrop-blur-lg sticky top-0 left-0 w-[350px] px-4 py-2 flex items-center pb-2  gap-4 border-b bg-white/10 z-50 shadow-md">
        <button
          className="hover:opacity-45 p-2 rounded-full border border-transparent hover:border-sunbird-navy-blue hover:bg-sunbird-navy-blue/40"
          onClick={() => setScreen("Villages")}
        >
          <ArrowLeft
            size={20}
            className="font-extrabold text-sunbird-navy-blue"
          />
        </button>
        <p className="text-sunbird-navy-blue font-extrabold text-lg">
          {screen}
        </p>
      </nav>
      <div className="px-4 h-[calc(100vh-56px)] overflow-y-auto mx-auto overflow-x-hidden">
        {children}
      </div>
    </div>
  );
};

export default Screens;

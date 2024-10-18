"use client";

import styles from "@/app/styles/main-sidebar.module.css";
import { useMapContext } from "@/app/providers/map-provider";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
}
const Screens = ({ children }: Props) => {
  const { screen, setScreen } = useMapContext();
  const scrollRef = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [screen]);
  return (
    <>
      <div className="backdrop-blur-lg sticky top-0 left-0 w-full flex items-center gap-4 justify-start px-4 pb-2 my-3 bg-white z-50 shadow-md">
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
      </div>

      <div className="px-4 h-[calc(100vh-56px)] overflow-y-auto mx-auto">
        {children}
      </div>
    </>
  );
};
export default Screens;

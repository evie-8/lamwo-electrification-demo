"use client";

import styles from "@/app/styles/screens.module.css";
import { useMapContext } from "@/app/providers/map-provider";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import useWindowDimensions from "@/hooks/window-dimensions";

interface Props {
  children: React.ReactNode;
}
const Screens = ({ children }: Props) => {
  const { screen, setScreen, rightSideBar } = useMapContext();
  const { width } = useWindowDimensions();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  
  let widthSideBar = "w-[350px]"

  if (width > 1350) {
   widthSideBar = "w-[400px]"
  } 

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [screen]);
  return (
    <div
      className={`${styles.screen_wrapper} ${
        width < 1024 ? "w-full" : widthSideBar
      } ${rightSideBar ? "flex" : "hidden"}`}
    >
      <div className={styles.nav_bar}>
        <button onClick={() => setScreen("Villages")}>
          <ArrowLeft size={18} className={styles.icon} />
        </button>
        <p>{screen}</p>
      </div>

      <div className={styles.content} ref={scrollRef}>{children}</div>
    </div>
  );
};
export default Screens;

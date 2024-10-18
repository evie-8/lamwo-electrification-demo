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
  const scrollRef = useRef<HTMLElement | undefined>(undefined);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [screen]);
  return (
    <div
      className={`${styles.screen_wrapper} ${
        width < 1024 ? "w-full" : "w-[350px]"
      } ${rightSideBar ? "flex" : "hidden"}`}
    >
      <div className={styles.nav_bar}>
        <button onClick={() => setScreen("Villages")}>
          <ArrowLeft size={18} className={styles.icon} />
        </button>
        <p>{screen}</p>
      </div>

      <div className={styles.content}>{children}</div>
    </div>
  );
};
export default Screens;

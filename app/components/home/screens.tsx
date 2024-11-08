"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";
import styles from "@/app/styles/screens.module.css";
import { useMapContext } from "@/app/providers/map-provider";

interface Props {
  children: React.ReactNode;
}

const Screens = ({ children }: Props) => {
  const { screen, setScreen, rightSideBar } = useMapContext();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [screen]);
  return (
    <div
      className={`${styles.screen_wrapper} ${rightSideBar ? "flex" : "hidden"}`}
    >
      <div className={styles.nav_bar}>
        <button onClick={() => setScreen("Villages")}>
          <ArrowLeft size={18} className={styles.icon} />
        </button>
        <p>{screen}</p>
      </div>

      <div className={styles.content} ref={scrollRef}>
        {children}
      </div>
    </div>
  );
};
export default Screens;

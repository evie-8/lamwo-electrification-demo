"use client";

import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import AboutTab from "@/app/components/home/about";
import { useMapContext } from "@/app/providers/map-provider";
import ResearchTab from "@/app/components/home/project-resources";
import Villages from "@/app/components/home/villages";
import VillageDetails from "@/app/components/home/village-details";
import styles from "@/app/styles/main-sidebar.module.css";
import Screens from "@/app/components/home/screens";

const MainSideBar = () => {
  const { screen, setScreen, detailsVillage, rightSideBar } = useMapContext();
  const [query, setQuery] = useState("");
  const scrollRef = useRef<HTMLElement | null>(null);

  const handleClick = (screenName: string) => {
    setScreen(screenName);
    setQuery("");
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [screen]);
  return (
    <>
      {screen !== "Villages Details" ? (
        <section
          className={`${styles.main_sidebar}
           ${rightSideBar ? "flex" : "hidden"}`}
        >
          <nav>
            <div>
              <Image src={"/memdlogo.svg"} alt="logo" width={60} height={60} />
              <h2 className={styles.title}>Lamwo Electrification</h2>
            </div>
            <div className="relative">
              <input
                id="search"
                value={query}
                className={styles.search_input}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={() =>
                  setScreen((prev: string) => {
                    if (prev !== "Villages") {
                      return "Villages";
                    }
                    return prev;
                  })
                }
                placeholder="Search village ..."
              />
              <Search size={20} className={styles.search_icon} />
            </div>
            <p className={styles.category_filters}>
              {["Villages", "Project Resources", "About Project"].map(
                (screenName, i) => {
                  return (
                    <span
                      key={i}
                      className={`${
                        screen
                          .toLowerCase()
                          .startsWith(screenName.toLowerCase()) && styles.active
                      }`}
                      onClick={() => {
                        handleClick(screenName);
                      }}
                    >
                      {screenName}
                    </span>
                  );
                }
              )}
            </p>
          </nav>

          <section ref={scrollRef} className={styles.screen_wrapper}>
            {screen === "Villages" && <Villages searchQuery={query} />}
            {screen === "About Project" && <AboutTab />}
            {screen === "Project Resources" && <ResearchTab />}
          </section>
        </section>
      ) : (
        <Screens>
          <VillageDetails data={detailsVillage} />
        </Screens>
      )}
    </>
  );
};

export default MainSideBar;

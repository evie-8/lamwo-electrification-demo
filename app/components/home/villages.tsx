"use client";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import Image from "next/image";
import styles from "@/app/styles/villages.module.css";
import VillageCard from "@/app/components/home/village-card";
import { fetchVillages, getTotalPages } from "@/lib/api";
import { categoriesVillages } from "@/constants";
import { Skeleton } from "@/app/components/ui/skeleton";
import { VillageData } from "@/types";

const Villages = ({ searchQuery }: { searchQuery?: string }) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("All");
  const [villages, setVillages] = useState<VillageData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  const currentCategory = categoriesVillages.filter(
    (cat) => cat.text === category
  )[0];

  const newFilters = {
    text: "All",
    category: "All",
  };

  const filters = [...categoriesVillages, newFilters];
  filters.sort((a, b) => a.text.localeCompare(b.text));

  // const triggerFlicker = (id: number, source: string) => {
  //   if (mapRef.current) {
  //     // Reduce opacity
  //     mapRef.current.setFeatureState(
  //       { source: source, id: id },
  //       { click: true }
  //     );

  //     // Restore opacity after a short delay (e.g., 500ms)
  //     setTimeout(() => {
  //       mapRef?.current?.setFeatureState(
  //         { source: source, id: id },
  //         { click: false }
  //       );
  //     }, 500);
  //   }
  // };

  // const categoryclicked = (name: string) => {
  //   //setCategory(name);
  //   if (currentCategory && currentCategory.text === name) {
  //     data.forEach((village) => {
  //       if (village.NES_category === currentCategory?.category) {
  //         triggerFlicker(village.ID, currentCategory.source_id);
  //       }
  //     });
  //   }
  // };

  const loadVillages = useCallback(async () => {
    setLoading(true);
    const nextPage = page + 1;

    if (page > 0) {
      let newVillages = [];

      // Fetch based on the category
      if (category !== "All" && currentCategory) {
        newVillages = await fetchVillages(
          searchQuery,
          nextPage,
          currentCategory.category
        );
      } else {
        // Fetch without category filter
        newVillages = await fetchVillages(searchQuery, nextPage);
      }
      setVillages((prev) => [...prev, ...newVillages]);
      if (searchQuery) {
        setTotalPages(Math.ceil(villages.length / 15));
      }
      setPage(nextPage);
      setLoading(false);

      console.log("data", newVillages);
    }
  }, [category, currentCategory, page, searchQuery, villages]);

  useEffect(() => {
    if (inView) {
      loadVillages();
    }
  }, [inView, loadVillages]);

  useEffect(() => {
    const fetchData = async () => {
      let initialVillages = [];
      let pages = 0;

      if (category !== "All" && currentCategory) {
        initialVillages = await fetchVillages("", 1, currentCategory.category);
        pages = await getTotalPages(currentCategory.category);
      } else {
        initialVillages = await fetchVillages("", 1);
        pages = await getTotalPages();
      }

      setVillages(initialVillages);
      setTotalPages(pages);
      setPage(1);
      setLoading(false);
    };
    fetchData();
  }, [category, currentCategory]);

  useEffect(() => {
    const fetchData = async () => {
      let initialVillages = [];
      let pages = 0;

      initialVillages = await fetchVillages(searchQuery, 1);
      pages = await getTotalPages();

      setVillages(initialVillages);
      setTotalPages(pages);
      setPage(1);
      setLoading(false);
    };
    fetchData();
  }, [searchQuery]);
  return (
    <>
      {!searchQuery && (
        <>
          <div className="cover-card">
            <Image alt="village" fill src={"/bkgrd-01.jpg"} />
            <h1>Electrification strategy for Lamwo district</h1>
          </div>

          <div className={styles.filter_container}>
            {filters.map((cat, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    setCategory(cat.text);
                  }}
                  className={`${category === cat.text && styles.active}`}
                >
                  <span>{cat.text}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {villages.length === 0 && !searchQuery && (
        <div className="mt-[20px]">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b gap-12 mb-4 pb-2"
            >
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-2 w-[50px]" />
              </div>
              <Skeleton className="p-2 rounded-full" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-3">
        {villages.length === 0 && !loading && searchQuery && (
          <span className=" font-medium text-opacity-50">
            No Villages Found
          </span>
        )}
        {villages &&
          villages.map((village: VillageData, i) => {
            return <VillageCard data={village} key={i} />;
          })}
      </div>

      {page !== 0 && page < totalPages && !loading && villages.length > 0 && (
        <div className="flex items-center justify-center mt-3" ref={ref}>
          <Loader2 size={20} className="animate-spin" />
        </div>
      )}
    </>
  );
};

export default Villages;

import { useEffect, useState } from "react";
import VillageCard from "./village-card";
import { useInView } from "react-intersection-observer";
import { fetchVillages, getTotalPages } from "@/utils";
import { Loader2 } from "lucide-react";
import { useMapContext } from "../map-provider";
import data from "@/public/villages.json";
import { categoriesVillages } from "@/constants";
const Villages = ({ searchQuery }: { searchQuery?: string }) => {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState("All");
  const [villages, setVillages] = useState([]);
  const { mapRef, setScreen, screen } = useMapContext();
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  if (searchQuery && screen !== "Villages") {
    setScreen("Villages");
  }

  const currentCategory = categoriesVillages.filter(
    (cat) => cat.text === category
  )[0];

  const newFilters = {
    text: "All",
    category: "All",
  };
  const filters = [...categoriesVillages, newFilters];
  filters.sort((a, b) => a.text.localeCompare(b.text));

  const triggerFlicker = (id: number, source: string) => {
    if (mapRef.current) {
      // Reduce opacity
      mapRef.current.setFeatureState(
        { source: source, id: id },
        { click: true }
      );

      // Restore opacity after a short delay (e.g., 500ms)
      setTimeout(() => {
        mapRef?.current?.setFeatureState(
          { source: source, id: id },
          { click: false }
        );
      }, 500);
    }
  };

  const categoryclicked = (name: string) => {
    setCategory(name);
    if (currentCategory && currentCategory.text === name) {
      data.forEach((village) => {
        if (village.NES_category === currentCategory?.category) {
          triggerFlicker(village.ID, currentCategory.source_id);
        }
      });
    }
  };

  const loadVillages = async () => {
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

      //@ts-ignore
      setVillages((prev) => [...prev, ...newVillages]);
      if (searchQuery) {
        setTotalPages(Math.ceil(villages.length / 15));
      }
      setPage(nextPage);
      setLoading(false);

      console.log("data", newVillages);
    }
  };

  useEffect(() => {
    if (inView) {
      loadVillages();
    }
  }, [inView]);

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
  }, [category]);

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
          <div className="cover-card fade-in">
            <span className="mt-auto">
              Electrification strategy for Lamwo district
            </span>
          </div>

          <div className="flex items-center center gap-y-2 gap-x-3 flex-wrap">
            {filters.map((cat, i) => {
              return (
                <button
                  key={i}
                  onClick={() => {
                    categoryclicked(cat.text);
                  }}
                  className={`flex justify-between items-center whitespace-nowrap rounded-full border-2 font-bold border-sunbird-navy-blue py-1 px-3 transition-all ease-in duration-100 ${
                    category === cat.text
                      ? "text-white bg-sunbird-navy-blue"
                      : "bg-transparent text-sunbird-navy-blue"
                  }`}
                >
                  <span>{cat.text}</span>
                </button>
              );
            })}
          </div>
        </>
      )}

      {villages.length === 0 && !searchQuery && (
        <span className="flex items-center justify-center mt-[50px]">
          <Loader2 size={30} className="m-auto animate-spin" fontWeight={800} />
        </span>
      )}
      <div className="mt-3">
        {villages.length === 0 && !loading && searchQuery && (
          <span className=" font-bold text-gray-400">No Villages Found</span>
        )}
        {villages &&
          villages.map((village: any, i) => {
            return <VillageCard key={i} data={village} />;
          })}
      </div>

      {page !== 0 && page < totalPages && !loading && (
        <div className="flex items-center justify-center mt-3" ref={ref}>
          <Loader2 size={20} className="animate-spin" />
        </div>
      )}
    </>
  );
};

export default Villages;

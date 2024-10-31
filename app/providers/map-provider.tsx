"use client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { MapRef } from "react-map-gl";
import { Feature } from "geojson";
import { VillageData } from "@/types";

// Create a context for the map reference
interface MapContextType {
  mapRef: React.RefObject<MapRef>;
  setMapRef: (map: MapRef | null) => void;
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  rightSideBar: boolean;
  setRightSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
  selectedFeature: Feature | null | undefined;
  setDetailsVillage: React.Dispatch<
    React.SetStateAction<VillageData | null | undefined>
  >;
  detailsVillage: VillageData | null | undefined;
  setSelectedFeature: React.Dispatch<
    React.SetStateAction<Feature | null | undefined>
  >;
  filteredBuildings: Feature[] | null | undefined;
  setFilteredBuildings: React.Dispatch<
    React.SetStateAction<Feature[] | null | undefined>
  >;
  key: number;
  setKey: React.Dispatch<React.SetStateAction<number>>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);

  const mapRef = useRef<MapRef | null>(null);
  const [detailsVillage, setDetailsVillage] = useState<
    VillageData | null | undefined
  >(undefined);
  const [sideBar, setSideBar] = useState(true);
  const [rightSideBar, setRightSideBar] = useState(true);
  const [screen, setScreen] = useState("Villages");
  const [key, setKey] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<
    Feature | null | undefined
  >(null);
  const [filteredBuildings, setFilteredBuildings] = useState<
    Feature[] | null | undefined
  >(undefined);

  const setMapRef = (map: MapRef | null) => {
    mapRef.current = map;
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Memoizing the context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      mapRef,
      setMapRef,
      sideBar,
      setSideBar,
      screen,
      setScreen,
      filteredBuildings,
      setFilteredBuildings,
      selectedFeature,
      setSelectedFeature,
      detailsVillage,
      setDetailsVillage,
      key,
      setKey,
      rightSideBar,
      setRightSideBar,
    }),
    [
      sideBar,
      screen,
      filteredBuildings,
      selectedFeature,
      detailsVillage,
      key,
      rightSideBar,
    ]
  );

  if (!isMounted) {
    return null;
  }

  return <MapContext.Provider value={value}>{children}</MapContext.Provider>;
};

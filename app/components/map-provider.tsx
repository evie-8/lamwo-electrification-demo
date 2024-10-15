"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { MapRef } from "react-map-gl";
import { Feature } from "geojson";
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
  setDetailsVillage: React.Dispatch<React.SetStateAction<any>>;
  detailsVillage: any;
  setSelectedFeature: React.Dispatch<
    React.SetStateAction<Feature | null | undefined>
  >;
  filteredBuildings: Feature[] | null;
  setFilteredBuildings: React.Dispatch<React.SetStateAction<Feature[] | null>>;
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

  let mapRef = useRef<MapRef>(null);
  const [detailsVillage, setDetailsVillage] = useState({});
  const [sideBar, setSideBar] = useState(true);
  const [rightSideBar, setRightSideBar] = useState(true);
  const [screen, setScreen] = useState("Villages");
  const [key, setKey] = useState(0);
  const [selectedFeature, setSelectedFeature] = useState<
    Feature | null | undefined
  >(null);
  const [filteredBuildings, setFilteredBuildings] = useState<Feature[] | null>(
    null
  );
  const setMapRef = (map: MapRef | null) => {
    //@ts-ignore
    mapRef.current = map;
  };
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <MapContext.Provider
      value={{
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
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

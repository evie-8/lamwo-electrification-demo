"use client";
import { createContext, useContext, useRef, useState } from "react";
import { MapRef } from "react-map-gl";

// Create a context for the map reference
interface MapContextType {
  mapRef: React.RefObject<MapRef>;
  setMapRef: (map: MapRef | null) => void;
  sideBar: boolean;
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
  screen: string;
  setScreen: React.Dispatch<React.SetStateAction<string>>;
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
  let mapRef = useRef<MapRef>(null);
  const [sideBar, setSideBar] = useState(false);
  const [screen, setScreen] = useState("Villages");

  const setMapRef = (map: MapRef | null) => {
    //@ts-ignore
    mapRef.current = map;
  };

  return (
    <MapContext.Provider
      value={{ mapRef, setMapRef, sideBar, setSideBar, screen, setScreen }}
    >
      {children}
    </MapContext.Provider>
  );
};

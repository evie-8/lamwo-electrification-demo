import type { Metadata } from "next";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapInterface from "./components/map-interface";
import { MapProvider } from "./providers/map-provider";

export const metadata: Metadata = {
  title: "Lamwo Electrification",
  description: "Electrification strategy for Lamwo District",
  keywords: ["Sunbird AI", "GIZ", "Electrification In Uganda"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MapProvider>
        
          {children}
        </MapProvider>
      </body>
    </html>
  );
}

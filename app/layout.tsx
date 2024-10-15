import type { Metadata } from "next";
import "./globals.css";
import "./styles/home.modules.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MapInterface from "./components/map-interface";
import { MapProvider } from "./components/map-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <MapInterface>{children}</MapInterface>
        </MapProvider>
      </body>
    </html>
  );
}
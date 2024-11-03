//import {Poppins} from "next/font/google"
import type { Metadata } from "next";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProvider } from "@/app/providers/map-provider";

export const metadata: Metadata = {
  title: "Lamwo District Electrification",
  description: "Electrification strategy for Lamwo District",
  keywords: [
    "Electrification In Uganda",
    "Lamwo",
    "Lamwo District",
    "Sustainable energy",
  ],
  authors: [{ name: "Sunbird AI", url: "https//sunbird.ai" }],
  robots: "index, follow",
  openGraph: {
    title: "Lamwo District Electrification",
    description: "Electrification strategy for Lamwo District",
    url: "https://lamwo-electrification-demo.vercel.app",
    //images: "https://lamwo-electrification-demo.vercel.app/electrification.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <MapProvider>{children}</MapProvider>
      </body>
    </html>
  );
}

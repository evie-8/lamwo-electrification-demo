import {Poppins} from "next/font/google"
import type { Metadata } from "next";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapProvider } from "./providers/map-provider";

export const metadata: Metadata = {
  title: "Lamwo District Electrification",
  description: "Electrification strategy for Lamwo District",
  keywords: ["Machine learning", "Electrification In Uganda"],
  authors: [{ name: "Sunbird AI", url: "https//sunbird.ai" }],
  robots: "index, follow",
  openGraph: {
    title: "Lamwo District Electrification",
    description: "Electrification strategy for Lamwo District",
    url: "https://lamwo-electrification.vercel.app", //getimages
    //images: "https://yourdomain.com/images/electrification.jpg",
  },
};
const poppins = Poppins({subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${poppins.className}`}>
        <MapProvider>{children}</MapProvider>
      </body>
    </html>
  );
}

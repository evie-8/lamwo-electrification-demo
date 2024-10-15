import villages from "@/public/villages.json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const category = url.searchParams.get("category")?.toLowerCase() || "";

  // Ensure that you return a value from the filter function
  const filteredVillages = villages.filter((village) => 
    village.NES_category.toLowerCase().includes(category)
  );

  const totalItems = filteredVillages.length;
  const totalPages = Math.ceil(totalItems / 15);

  return NextResponse.json({ 
    totalPages,
    filteredVillages // If you want to return the filtered villages as well
  });
}

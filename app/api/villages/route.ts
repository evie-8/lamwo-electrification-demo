import villages from "@/public/villages.json";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  let filteredVillages = villages;
  const url = new URL(req.url);
  const searchQuery = url.searchParams.get("search")?.toLowerCase() || "";
  const category = url.searchParams.get("category")?.toLowerCase() || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "15", 10);

  // Combine search and category filters together
  filteredVillages = villages.filter((village) => {
    const matchesSearch = village.village.toLowerCase().includes(searchQuery);
    const matchesCategory = category
      ? village.NES_category.toLowerCase().includes(category)
      : true; // If no category is selected, include all
    return matchesSearch && matchesCategory;
  });

  const totalItems = filteredVillages.length;
  const totalPages = Math.ceil(totalItems / limit);
  const offset = (page - 1) * limit;

  const paginatedVillages = filteredVillages.slice(offset, offset + limit);

  return NextResponse.json({
    totalItems,
    totalPages,
    currentPage: page,
    limit,
    data: paginatedVillages,
  });
}

// lib/actions/index.ts

import { prisma } from "@/lib/db";
import { unstable_cache } from "next/cache";

// 🔥 Single cached fetch
export const getProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
  },
  ["products"],
  {
    tags: ["products"],
  }
);

// 🔥 OPTIMIZED: derive everything from one dataset
export async function getHomepageProducts() {
  const products = await getProducts();

  const featured = products
    .filter((p) => p.isFeatured)
    .slice(0, 5);

  const newReleasesFiltered = products.filter((p) =>
    isRecent(p.createdAt),
  );

  const newReleases =
    newReleasesFiltered.length >= 5
      ? newReleasesFiltered.slice(0, 5)
      : products.slice(0, 5);

  return {
    featured,
    newReleases,
    all: products,
  };
}

// ✅ Safe date handling
function isRecent(createdAt: Date | string) {
  const created =
    typeof createdAt === "string"
      ? new Date(createdAt)
      : createdAt;

  if (isNaN(created.getTime())) return false;

  return (
    Date.now() - created.getTime() <=
    30 * 24 * 60 * 60 * 1000
  );
}
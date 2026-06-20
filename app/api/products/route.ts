// app/api/products/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

type PublicProductRecord = {
  id: string;
  title: string;
  price: number;
  isFeatured: boolean;
  categoryId: string | null;
  desc: string | null;
  brief: string | null;
  originalPrice: number | null;
  discount: number | null;
  image: string | null;
  images: string[];
  badge: string | null;
  tools: string[];
  features: string[];
  compatibleWith: string[];
  driveLink: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type PublicProductResponse = Omit<
  PublicProductRecord,
  "createdAt" | "updatedAt"
> & {
  createdAt: Date;
  updatedAt: Date;
  description: string | null;
  imageUrl: string[];
};

function toLegacyProductShape(
  product: PublicProductRecord,
): PublicProductResponse {
  return {
    ...product,
    description: product.desc ?? product.brief ?? null,
    imageUrl:
      product.images.length > 0
        ? product.images
        : product.image
          ? [product.image]
          : [],
  };
}

export async function GET() {
  try {
    const products = (await prisma.product.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    })) as PublicProductRecord[];

    return NextResponse.json(products.map(toLegacyProductShape));
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

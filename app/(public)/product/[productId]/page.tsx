import ProductHero from "@/components/ProductHero";
// import { products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/db";
import NotFound from "@/app/not-found";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  // const { productId } = await params;

  // const product = products.find((p) => p.id === productId);
  const { productId } = await params;
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product || !product.isActive) {
    return NotFound();
  }

  return <ProductHero product={product} />;
}

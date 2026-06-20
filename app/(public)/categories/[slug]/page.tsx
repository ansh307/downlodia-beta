// import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { prisma } from "@/lib/db";
import { Box, TriangleAlert } from "lucide-react";
import Link from "next/link";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const category = await prisma.category.findUnique({
    where: { slug },
  });

  if (!category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="text-center max-w-md w-full">
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-3xl text-indigo-600">
              <TriangleAlert />
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Category Not Found
          </h1>

          {/* Subtitle */}
          <p className="text-gray-500 text-sm mb-6">
            The category you're looking for doesn't exist or may have been
            removed.
          </p>

          {/* CTA */}
          <Link
            href="/all-products"
            className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const filteredProducts = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      isActive: true,
    },
  });

  return (
    <section className="w-full px-6 py-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          {category.name || "Products"} in {slug}
        </h2>
      </div>

      {/* PRODUCTS GRID */}
      {/* PRODUCTS GRID / EMPTY STATE */}
      <div className="max-w-7xl mx-auto">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Icon */}
            <div className="w-16 h-16 mb-4 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-2xl text-indigo-600">
                <Box />
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Products Yet
            </h3>

            {/* Subtitle */}
            <p className="text-gray-500 text-sm max-w-sm mb-6">
              There are no products available in this category right now. Please
              check back later or explore other categories.
            </p>

            {/* CTA */}
            <Link
              href="/all-products"
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
            >
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

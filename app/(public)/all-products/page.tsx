import { ProductCard } from "@/components/ProductCard";
// import { products } from "@/data/products";
import React from "react";
import { prisma } from "@/lib/db";

const AllProducts = async () => {
  const products = await prisma.product.findMany();

  return (
    <section className="w-full px-6 py-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default AllProducts;

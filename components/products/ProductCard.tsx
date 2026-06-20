/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import type { Product } from "@/types/product";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="block border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition hover:-translate-y-1"
    >
      <div className="cursor-pointer">
        {product.imageUrl?.[0] && (
          <Image
            src={product.imageUrl[0]}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-indigo-600">
              ₹{(product.price / 100).toFixed(2)}
            </span>
            <span className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition">
              View Product
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

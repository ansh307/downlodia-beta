import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export function ProductCard({ product }: any) {
  const calculatedPrice =
    product.originalPrice - (product.originalPrice * product.discount) / 100;
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
    >
      {/* IMAGE */}
      <div className="relative w-full h-40">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />

        {/* BADGE */}
        {product.badge && (
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-md bg-indigo-600 text-white">
            {product.badge}
          </span>
        )}

        {/* TOOL ICONS */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          {product.tools.map((tool: string, i: number) => (
            <span
              key={i}
              className="text-[10px] px-2 py-1 bg-black/60 text-white rounded"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-900 leading-tight">
          {product.title}
        </h3>

        {/* Fixed description with better readability */}
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {product.desc}
        </p>

        {/* PRICE + CART */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="font-semibold text-gray-900">
            ₹{calculatedPrice.toFixed(2)}
          </span>

          <button className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
}

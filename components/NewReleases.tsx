import { prisma } from "@/lib/db";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";

function formatPrice(price: number) {
  return `₹${(price / 100).toFixed(2)}`;
}

function isRecent(createdAt: Date) {
  const currentDate = new Date();
  const timeDiff = currentDate.getTime() - createdAt.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);
  return daysDiff <= 30;
}

function NewReleaseCard({
  product,
}: {
  product: {
    id: string;
    title: string;
    desc: string | null;
    brief: string | null;
    price: number;
    image: string | null;
    images: string[];
    badge: string | null;
    tools: string[];
  };
}) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition"
    >
      <div className="relative w-full h-40 bg-gray-100">
        {product.image || product.images[0] ? (
          <img
            src={product.image || product.images[0]}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-gray-500">
            No image available
          </div>
        )}

        {product.badge && (
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-md bg-emerald-600 text-white">
            {product.badge}
          </span>
        )}

        {product.tools.length > 0 && (
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {product.tools.slice(0, 2).map((tool) => (
              <span
                key={tool}
                className="text-[10px] px-2 py-1 bg-black/60 text-white rounded"
              >
                {tool}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-gray-900">{product.title}</h3>
        <p className="text-xs text-gray-500">
          {product.desc ?? product.brief ?? "No description available"}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>

          <span className="p-2 rounded-lg bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function NewReleases({ visibleProducts }: any) {
  return (
    <section className="w-full px-6 py-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">New Releases</h2>
          <p className="text-sm text-gray-500">Fresh assets added weekly 🔥</p>
        </div>
      </div>

      {/* GRID AREA */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleProducts.map((item: any) => (
          <ProductCard key={item.id} item={item} product={item} />
        ))}
      </div>
    </section>
  );
}

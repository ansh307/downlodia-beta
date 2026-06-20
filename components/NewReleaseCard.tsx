import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export function NewReleaseCard({ item }: any) {
  return (
    <div className="min-w-[220px] bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition group">
      {/* IMAGE */}
      <div className="relative w-full h-36">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />

        {/* NEW BADGE */}
        <span className="absolute top-2 left-2 text-[10px] px-2 py-1 rounded-md bg-indigo-100 text-indigo-600 font-medium">
          NEW
        </span>

        {/* TOOLS */}
        <div className="absolute bottom-2 left-2 flex gap-1">
          {item.tools.map((tool: string, i: number) => (
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
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
        <p className="text-xs text-gray-500">{item.category}</p>

        <div className="flex items-center justify-between mt-3">
          <span className="font-semibold text-gray-900">₹{item.price}</span>

          <button className="p-2 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-600 hover:text-white transition">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

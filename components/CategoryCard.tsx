import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  Video,
  SlidersHorizontal,
  FileText,
  PenTool,
  Waves,
  GraduationCap,
  Gift,
} from "lucide-react";
import Link from "next/link";

const iconMap: any = {
  video: Video,
  sliders: SlidersHorizontal,
  file: FileText,
  pen: PenTool,
  wave: Waves,
  graduation: GraduationCap,
  gift: Gift,
};

export function CategoryCard({ category }: any) {
  const Icon = iconMap[category.icon];

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-full h-40 overflow-hidden">
        <Image
          src={category.image}
          alt={category.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* CONTENT */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* ICON */}
          <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
            <Icon size={18} />
          </div>

          {/* TEXT */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              {category.title}
            </h3>
            <p className="text-xs text-gray-500">{category.count}</p>
          </div>
        </div>

        {/* ARROW */}
        <ArrowRight
          size={16}
          className="text-gray-400 group-hover:text-indigo-600 transition"
        />
      </div>
    </Link>
  );
}

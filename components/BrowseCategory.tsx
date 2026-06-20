import { categories } from "@/data/categories";
import { CategoryCard } from "./CategoryCard";
import { ArrowRight } from "lucide-react";

export default function BrowseCategory() {
  return (
    <section id="categories" className="w-full px-6 py-6">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Browse by Category
          </h2>
          <p className="text-xs text-gray-500">
            Find the perfect assets for your next project
          </p>
        </div>

        {/* <button className="flex items-center gap-2 text-sm text-indigo-600 hover:underline">
          View all categories <ArrowRight size={16} />
        </button> */}
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
}

import { testimonials } from "@/data/testimonials";
import { TestimonialCard } from "./TestimonialCard";
import { ArrowRight } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="w-full px-6 py-12">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            What Our Customers Say
          </h2>
          <p className="text-xs text-gray-500">Trusted by creators worldwide</p>
        </div>
      </div>

      {/* CARDS */}
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="flex gap-6 animate-scroll">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[420px] flex-shrink-0"
            >
              <TestimonialCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

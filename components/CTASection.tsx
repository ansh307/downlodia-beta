import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollButton } from "./ScrollButton";

export default function CTASection() {
  return (
    <section className="w-full px-6 ">
      <div className="max-w-7xl mx-auto relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* BG IMAGE */}
        <Image
          src="/homepage/banner-bg.png"
          alt="bg"
          fill
          className="object-cover opacity-20 pointer-events-none"
        />
        {/* LEFT ICON */}
        <div className="flex items-center gap-5">
          <div className="w-40 h-20 relative">
            <Image
              src="/homepage/cta.png" // replace with your icon
              alt="cta"
              fill
              className="object-contain"
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              Get <span className="text-indigo-600">Exclusive Deals</span> & New
              Releases
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Join 15,000+ creators and never miss new assets or special offers.
            </p>
          </div>
        </div>

        {/* RIGHT CTA (REPLACED NEWSLETTER) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 z-10">
          {/* PRIMARY CTA */}
          <Link
            href="/all-products"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm"
          >
            Explore Products <ArrowRight size={16} />
          </Link>

          {/* SECONDARY CTA */}
          <ScrollButton
            targetId="bundles"
            className="px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium hover:bg-gray-50 transition"
          >
            View Bundles
          </ScrollButton>
        </div>

        {/* BACKGROUND DECOR (optional dots like your design) */}
        <div className="absolute right-0 top-0 w-40 h-40 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[size:12px_12px]" />
        </div>

        <div className="absolute left-0 top-0 w-40 h-40 opacity-20 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle,#a78bfa_1px,transparent_1px)] bg-[size:12px_12px]" />
        </div>
      </div>
    </section>
  );
}

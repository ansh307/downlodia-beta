// bundle

"use client";

import Image from "next/image";
import { Check, Infinity, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BundleSection() {
  const [bundle, setBundle] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/bundles")
      .then((res) => res.json())
      .then((data) => {
        setBundle(data.bundles?.[0] ?? null);
      })
      .catch(console.error);
  }, []);

  if (!bundle) return null;

  return (
    <section id="bundles" className="w-full px-4 sm:px-6 py-6">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-xl p-5 sm:p-6 lg:p-8">
        {/* Background */}
        <Image
          src="/homepage/banner-bg.png"
          alt="Background"
          fill
          className="object-cover opacity-20 pointer-events-none"
        />

        <div className="relative z-10 flex flex-col xl:flex-row items-center xl:items-stretch gap-8 lg:gap-10">
          {/* LEFT */}
          <div className="flex-1 w-full space-y-4 sm:space-y-5">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">
              🔥 {bundle.badge}
            </span>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
              {bundle.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {bundle.description}
            </p>

            {/* FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {bundle.features?.map((item: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Check
                    size={16}
                    className="mt-0.5 shrink-0 text-indigo-600"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6">
            {/* Bundle Image */}
            <div className="relative w-[140px] h-[190px] sm:w-[180px] sm:h-[240px] lg:w-[220px] lg:h-[280px] shrink-0">
              <Image
                src="/homepage/bundle-box.png"
                alt="Bundle"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            {/* Stats */}
            <div className="flex flex-row sm:flex-col gap-3 w-full sm:w-auto justify-center">
              <Stat label="Assets" value="500+" />
              <Stat label="Categories" value="50+" />
              <Stat label="Possibilities" value="∞" icon />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden xl:block h-48 border-l border-gray-200" />

          {/* RIGHT */}
          <div className="flex-1 w-full space-y-5">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">
              LIMITED TIME OFFER
            </span>

            {/* Price */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                ₹{bundle.price}
              </span>

              {bundle.originalPrice && (
                <span className="text-gray-400 line-through text-sm sm:text-base">
                  ₹{bundle.originalPrice}
                </span>
              )}

              {bundle.discount && (
                <span className="text-sm font-medium text-indigo-600">
                  {bundle.discount}% OFF
                </span>
              )}
            </div>

            {/* CTA */}
            <Link
              href={`/bundle/${bundle.id}/checkout`}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-medium text-white transition hover:bg-indigo-700"
            >
              Get This Bundle
              <ArrowRight size={16} />
            </Link>

            <p className="text-xs text-gray-500">
              ○ One-time payment • Lifetime access
            </p>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 overflow-hidden rounded-full border-2 border-white"
                  >
                    <Image
                      src={`/homepage/avatar-${i}.jpg`}
                      alt="User"
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <span className="text-center sm:text-left text-sm text-gray-600">
                <span className="font-medium text-gray-900">+2K</span> joined
                5,000+ creators
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------- */
/* STAT CARD COMPONENT */
/* ---------------------- */

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: boolean;
}) {
  return (
    <div className="min-w-[90px] sm:min-w-[120px] rounded-xl border border-gray-200 bg-white px-3 sm:px-4 py-3 text-center shadow-lg">
      <div className="flex items-center justify-center gap-1 text-sm sm:text-base font-semibold text-gray-900">
        {icon ? <Infinity size={16} /> : value}
      </div>

      <p className="mt-1 text-[11px] sm:text-xs text-gray-500">{label}</p>
    </div>
  );
}

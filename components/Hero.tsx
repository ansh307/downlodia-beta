"use client";
import { Sparkles, Download, ShieldCheck, Cloud, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollButton } from "./ScrollButton";

const cards = [
  "/homepage/herocard-1.png",
  "/homepage/herocard-3.png",
  "/homepage/herocard-2.png",
];

export default function Hero() {
  const [active, setActive] = useState(0);

  // Auto carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % cards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full ">
      <div className="relative max-w-7xl mx-auto min-h-[65vh] flex items-center overflow-hidden rounded-xl">
        {/* BACKGROUND */}
        <Image
          src="/homepage/digital-vault-hero-bg.png"
          alt="bg"
          fill
          priority
          className="object-cover opacity-80"
        />

        {/* OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-linear-to-r from-white/20 via-white/80 to-transparent" />

        {/* CONTENT */}
        <div className="relative max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-10 lg:py-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* LEFT SIDE */}
          <div className="w-full lg:w-1/2 space-y-4">
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-medium">
              <Sparkles className="inline-block mr-2 w-4 h-4" />
              PREMIUM DIGITAL ASSETS
            </span>

            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-13">
              Premium Assets.
              <br />
              <span className="text-indigo-600">Instant</span> Access.
            </h1>

            <p className="text-gray-600 max-w-md">
              High-quality video bundles, templates, presets, and more. Pay
              once, use forever.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
              <Link
                href="/all-products"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition text-sm sm:text-base"
              >
                Explore Products →
              </Link>
              <ScrollButton
                targetId="bundles"
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-xl font-medium hover:bg-gray-50 transition text-sm sm:text-base"
              >
                View Bundles
              </ScrollButton>
            </div>

            {/* TRUST */}
            <div className="flex items-center gap-4 mt-4 sm:mt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border-2 border-white"
                  >
                    <Image
                      src={`/homepage/avatar-${i}.jpg`}
                      alt={`user${i}`}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600">
                <div>⭐⭐⭐⭐⭐</div>
                Trusted by 10,000+ Creators
              </div>
            </div>
          </div>

          {/* RIGHT SIDE CARDS */}
          <div className="w-full lg:w-1/2 relative h-80 sm:h-90 md:h-100 flex items-center justify-center mt-6 pb-6 sm:pb-0 lg:mt-0">
            {cards.map((src, index) => {
              const isActive = index === active;
              const isNext = index === (active + 1) % cards.length;
              const isPrev =
                index === (active - 1 + cards.length) % cards.length;

              return (
                <div
                  key={index}
                  className={`absolute transition-all duration-700 ease-in-out ${
                    isActive
                      ? "z-30 scale-100 translate-x-0 opacity-100"
                      : isNext
                        ? "z-20 scale-75 translate-x-30 sm:translate-x-45 opacity-70"
                        : isPrev
                          ? "z-20 scale-75 -translate-x-30 sm:-translate-x-45 opacity-70"
                          : "opacity-0 scale-75"
                  }`}
                >
                  <div className="w-52 sm:w-60 md:w-65 h-72 sm:h-80 md:h-90 rounded-2xl overflow-hidden shadow-2xl bg-white">
                    <Image
                      src={src}
                      alt="card"
                      width={260}
                      height={360}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              );
            })}

            {/* DOTS */}
            <div className="absolute bottom-0 flex gap-2">
              {cards.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i === active ? "bg-indigo-600 w-4" : "bg-gray-300"
                  } transition-all`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* BOTTOM FEATURES */}
      <div className="w-full px-3 sm:px-6 pb-6 mt-5">
        <div className="max-w-7xl mx-auto bg-white/80 sm:backdrop-blur-none backdrop-blur-lg sm:shadow-xl shadow-none border border-gray-100/50 rounded-2xl p-4 sm:p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <Feature
              icon={<Download size={22} className="text-indigo-600" />}
              title="Instant Download"
              desc="Get instant drive link after purchase"
            />

            <Feature
              icon={<ShieldCheck size={22} className="text-indigo-600" />}
              title="Secure Payment"
              desc="100% secure checkout powered by Razorpay"
            />

            <Feature
              icon={<Cloud size={22} className="text-indigo-600" />}
              title="Lifetime Access"
              desc="Download your file and keep it forever"
            />

            <Feature
              icon={<Star size={22} className="text-indigo-600" />}
              title="Premium Quality"
              desc="Carefully crafted by industry professionals"
              isLast
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Feature({
  icon,
  title,
  desc,
  isLast = false,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  isLast?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-3 pr-6 relative">
      {/* ICON */}
      <div className="p-2 rounded-lg  text-indigo-600">{icon}</div>

      {/* TEXT */}
      <div className="max-w-40">
        <h4 className="font-semibold text-sm text-gray-900">{title}</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{desc}</p>
      </div>

      {/* DIVIDER (only on md+) */}
      {!isLast && (
        <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-10 w-px bg-gray-100" />
      )}
    </div>
  );
}

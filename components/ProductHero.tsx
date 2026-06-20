"use client";

import Image from "next/image";
import { useState } from "react";
import { Star, Check, ShoppingCart, LockKeyholeIcon } from "lucide-react";

import { Download, Clock, Shield, RefreshCw } from "lucide-react";
import Link from "next/link";

const tabs = ["Description", "What's Included", "Compatibility"];

export default function ProductHero({ product }: { product: any }) {
  const [active, setActive] = useState(product.images[0]);
  const [activeTab, setActiveTab] = useState("Description");

  const calculatedPrice =
    product.originalPrice - (product.originalPrice * product.discount) / 100;

  return (
    <section className="w-full px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT: IMAGE GALLERY */}
        <div className="col-span-2">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* THUMBNAILS */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible">
              {product.images.map((img: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActive(img)}
                  className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    active === img
                      ? "border-indigo-600"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image src={img} alt="thumb" fill className="object-cover" />
                </button>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="relative w-full h-[350px] sm:h-[500px] lg:h-[650px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <Image
                src={active}
                alt={product.title}
                fill
                priority
                className="object-contain"
              />

              {product?.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-indigo-600 text-white">
                  {product.badge}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: PRODUCT INFO */}
        <div className="space-y-5">
          {/* TITLE */}
          <div>
            {product?.badge && (
              <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 font-medium">
                {product.badge}
              </span>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>

            <p className="text-gray-500 mt-1">{product.desc}</p>
          </div>

          {/* RATING */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <span className="text-sm text-gray-600">5.0</span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ₹{calculatedPrice.toFixed(2)}
            </span>
            <span className="line-through text-gray-400">
              ₹{product.originalPrice.toFixed(2)}
            </span>
            <span className="text-indigo-600 text-sm font-medium">
              {product.discount}% OFF
            </span>
          </div>

          {/* FEATURES */}
          <div className="space-y-3">
            {product.features?.map((item: string, i: number) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <Check size={16} className="text-indigo-600 mt-0.5" />
                {item}
              </div>
            )) ||
              product.features?.map((item: string, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <Check size={16} className="text-indigo-600 mt-0.5" />
                  {item}
                </div>
              ))}
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col gap-3 pt-3">
            <Link
              href={`/product/${product.id}/checkout`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-medium hover:opacity-90 transition"
            >
              <ShoppingCart size={18} />
              Buy Now
            </Link>

            <p className="text-xs text-gray-500 text-center flex items-center gap-2 justify-center mt-2">
              <LockKeyholeIcon size={16} /> Secure Checkout
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-4">
            {/* TOP FEATURES */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 mt-8 border rounded-xl border-gray-200 py-2 px-6 bg-gray-50">
              <TopFeature
                icon={<Download size={16} />}
                text="Instant Email Delivery"
              />
              <TopFeature icon={<Clock size={16} />} text="Lifetime Access" />
              <TopFeature
                icon={<Shield size={16} />}
                text="Commercial License"
              />
              <TopFeature
                icon={<RefreshCw size={16} />}
                text="High Quality Assets"
              />
            </div>

            {/* TABS */}
            <div className="flex gap-6 border-b border-gray-200 mb-8 text-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 px-4 ${
                    activeTab === tab
                      ? "text-indigo-600 border-b-3 border-indigo-600 font-medium"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Description" && (
              <div className="overflow-hidden">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {product.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
                  {product.brief}
                </p>
              </div>
            )}
            {activeTab === "Compatibility" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Compatible With
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.compatibleWith.map((tool: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 p-3 ">
                      <ToolIcon
                        name={tool}
                        src={`/tools/${tool.toLowerCase().replace(/\s/g, "")}.png`}
                      />

                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">
                          {tool}
                        </span>
                        <span className="text-xs text-gray-500">
                          Fully supported
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "What's Included" && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  What&apos;s Included
                </h3>

                {product.features?.map((item: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <Check size={16} className="text-indigo-600 mt-0.5" />
                    {item}
                  </div>
                )) ||
                  product.features?.map((item: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <Check size={16} className="text-indigo-600 mt-0.5" />
                      {item}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* TRUST BOX */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Trusted by 10,000+ Creators
              </p>

              <div className="flex justify-center items-center gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full overflow-hidden border-2 border-white"
                    >
                      <Image
                        src={`/homepage/avatar-${i}.jpg`}
                        alt="user"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                <div className="w-12 h-12 -ml-5 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold ">
                  +10K
                </div>
              </div>
            </div>

            {/* COMPATIBILITY */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 mb-4 text-center">
                Compatible With
              </p>

              <div className="flex justify-center items-center gap-2">
                {product.compatibleWith
                  .slice(0, 4)
                  .map((tool: string, i: number) => (
                    <ToolIcon
                      name={tool}
                      key={i}
                      src={`/tools/${tool.toLowerCase().replace(/\s/g, "")}.png`}
                    />
                  ))}

                {product.compatibleWith.length > 4 && (
                  <span className="text-xs text-gray-500 ml-2">
                    and more...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SMALL COMPONENTS */

function TopFeature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 p-3 rounded-xl  text-xs text-gray-700">
      <span className="text-indigo-600">{icon}</span>
      {text}
    </div>
  );
}

function ToolIcon({ src, name }: { src: string; name: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className="px-3 py-1 text-xs font-medium rounded-full bg-gray-200 text-gray-700">
        {name}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 flex items-center justify-center bg-gray-50">
      <Image
        src={src}
        alt={name}
        width={35}
        height={35}
        onError={() => setError(true)}
      />
    </div>
  );
}

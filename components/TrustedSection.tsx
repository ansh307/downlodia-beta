// trusted

import Image from "next/image";
import { Star } from "lucide-react";

export default function TrustedSection() {
  return (
    <section className="w-full px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto bg-gray-50/50 border-x border-t border-gray-100 rounded-t-2xl">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 py-6 px-4 sm:px-6">
          {/* LEFT */}
          <div className="flex-1 flex flex-col items-center lg:items-start gap-5 text-center lg:text-left">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Trusted by 25,000+ Creators Worldwide
            </h3>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 sm:gap-8 opacity-70">
              <Brand
                src="/homepage/trusted/youtube.svg"
                alt="YouTube"
                width={90}
                height={60}
              />

              <Brand
                src="/homepage/trusted/tiktok.png"
                alt="TikTok"
                width={90}
                height={20}
              />

              <Brand
                src="/homepage/trusted/instagram.png"
                alt="Instagram"
                width={90}
                height={20}
              />

              <Brand
                src="/homepage/trusted/twitch.svg"
                alt="Twitch"
                width={70}
                height={20}
              />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="hidden lg:block w-px h-16 bg-gray-100 mx-6" />

          {/* RIGHT */}
          <div className="flex-1 w-full flex flex-col sm:flex-row items-center justify-center lg:justify-between gap-6">
            {/* RATINGS */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-1 text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-sm text-gray-700 mt-3">
                <span className="font-semibold text-gray-900">4.9/5</span>{" "}
                average rating
              </p>

              <p className="text-xs text-gray-500">from 3,200+ reviews</p>
            </div>

            {/* AVATARS */}
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white relative"
                  >
                    <Image
                      src={`/homepage/avatar-${i}.jpg`}
                      alt="user"
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                ))}
              </div>

              <div className="w-10 h-10 sm:w-12 sm:h-12 -ml-2 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-xs sm:text-sm font-medium border-2 border-white">
                +3K
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Brand({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition"
        sizes={`${width}px`}
      />
    </div>
  );
}

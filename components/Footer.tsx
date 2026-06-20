import {
  Download,
  ShieldCheck,
  Clock,
  Star,
  LockKeyholeIcon,
} from "lucide-react";
import Link from "next/link";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-16">
      {/* TOP */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* LEFT BRAND */}
        <div className="md:col-span-2 space-y-5">
          {/* LOGO */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <Image
              src="/downlodia-logo.png"
              alt="Downloadia Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-contain "
            />
            <span className="text-gray-900">
              Downlodia<span className="text-indigo-600">.in</span>
            </span>
          </div>

          <p className="text-sm text-gray-600 max-w-72">
            Premium digital assets for creators. Instant access. Lifetime value.
          </p>

          {/* FEATURES */}
          <div className="space-y-3 text-xs text-gray-600">
            <FooterFeature
              icon={<Download size={16} />}
              text="Instant Download"
            />
            <FooterFeature
              icon={<ShieldCheck size={16} />}
              text="Secure Payment"
            />
            <FooterFeature icon={<Clock size={16} />} text="Lifetime Access" />
            <FooterFeature icon={<Star size={16} />} text="Premium Quality" />
          </div>
        </div>

        {/* LINKS */}
        <FooterColumn
          title="Products"
          links={[
            {
              label: "Video Bundles",
              href: "/categories/video-bundles",
            },
            {
              label: "Presets & LUTs",
              href: "/categories/presets-luts",
            },
            {
              label: "Templates",
              href: "/categories/templates",
            },
            {
              label: "Graphics",
              href: "/categories/graphics",
            },
            {
              label: "Sound Effects",
              href: "/categories/sound-effects",
            },
          ]}
        />

        <FooterColumn
          title="Company"
          links={[
            { label: "About Us", href: "/about" },
            { label: "Contact Us", href: "/contact" },
          ]}
        />

        <FooterColumn
          title="Legal"
          links={[
            {
              label: "License Agreement",
              href: "/legal/license-agreement",
            },
            {
              label: "Terms and Conditions",
              href: "/legal/terms-and-conditions",
            },
            {
              label: "Privacy Policy",
              href: "/legal/privacy-policy",
            },
            {
              label: "Refund Policy",
              href: "/legal/refund-policy",
            },
            {
              label: "Delivery Policy",
              href: "/legal/delivery-policy",
            },
          ]}
        />
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200 max-w-7xl mx-auto" />

      {/* BOTTOM */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* COPYRIGHT */}
        <p className="text-xs text-gray-500">
          © 2026 downlodia.in. All rights reserved.
        </p>

        {/* PAYMENTS */}
        <div className="flex items-center gap-3">
          {[
            "visa",
            "mastercard",
            "paypal",
            "apple-pay",
            "google-pay",
            "stripe",
          ].map((item, i) => (
            <div
              key={i}
              className="px-3 py-2 border border-gray-100 rounded-md bg-gray-50 flex items-center justify-center"
            >
              <Image
                src={`/payments/${item}.png`}
                alt={item}
                width={100}
                height={40}
                className="h-4 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* SHAKDBEE CREDIT */}
        <div className="relative group inline-block">
          {/* LINK */}
          <Link
            href="https://www.shakdbee.com/"
            target="_blank"
            className="transition-colors text-sm text-gray-500 hover:text-gray-600 hover:underline"
          >
            Crafted with precision by{" "}
            <span className="font-semibold text-gray-600">Shakdbee</span>
          </Link>

          {/* HOVER CARD */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-50">
            <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-4 text-left">
              {/* Title */}
              <p className="text-sm font-semibold text-gray-900 mb-1">
                Shakdbee
              </p>

              {/* Description */}
              <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                Premium web design & development studio crafting modern,
                high-performing digital experiences.
              </p>
            </div>

            {/* Arrow */}
            <div className="w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45 absolute left-1/2 -translate-x-1/2 top-full -mt-1"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* SMALL COMPONENTS */

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-4 text-sm">{title}</h4>

      <ul className="space-y-2 text-xs text-gray-600">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-indigo-600 transition">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterFeature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-indigo-600">{icon}</span>
      {text}
    </div>
  );
}

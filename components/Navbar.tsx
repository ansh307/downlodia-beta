//nvbar

import { ChevronDown, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { ScrollButton } from "./ScrollButton";
import NavSearchBar from "./NavSearchBar";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 md:grid md:grid-cols-[auto_minmax(0,1fr)_auto] md:gap-5">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 font-bold text-lg"
          >
            <Image
              src="/downlodia-logo.png"
              alt="Downloadia Logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-contain "
            />
            <span className="text-slate-900">
              Downlodia<span className="text-indigo-600">.in</span>
            </span>
          </Link>

          <div className="min-w-0 md:mx-auto md:w-full md:max-w-3xl">
            <NavSearchBar />
          </div>

          <ScrollButton
            targetId="categories"
            href="/"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 hover:shadow-md md:flex"
          >
            <span className="flex items-center gap-1.5">
              <LayoutDashboard className="text-indigo-600" size={16} />
              Shop by Category
            </span>
          </ScrollButton>
        </div>

        <nav className="-mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max items-center gap-2 text-sm font-medium text-slate-700 sm:gap-3">
            <NavItem label="Video Bundles" slug="video-bundles" />
            <NavItem label="Presets & LUTs" slug="presets-luts" />
            <NavItem label="Templates" slug="templates" />
            <NavItem label="Graphics" slug="graphics" />
            <NavItem
              label="Sound Effects"
              slug="sound-effects"
              isDropdown={false}
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavItem = ({
  label,
  slug,
  isDropdown = true,
}: {
  label: string;
  slug: string;
  isDropdown?: boolean;
}) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className="flex shrink-0 items-center gap-1.5 rounded-full border border-transparent px-3 py-2 transition hover:border-indigo-100 hover:bg-indigo-50 hover:text-indigo-600"
    >
      <span>{label}</span>
      {isDropdown && <ChevronDown size={14} className="-rotate-90" />}
    </Link>
  );
};

export default Navbar;

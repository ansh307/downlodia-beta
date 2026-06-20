"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Bundles",
    href: "/admin/bundles",
    icon: ShoppingCart,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* Top */}
      <div>
        {/* Logo */}
        <Link href={"/admin"} className="flex items-center gap-2 px-6 py-5">
          <Image
            src="/downlodia-logo.png"
            alt="Downloadia Logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-contain "
          />
          <span className="font-semibold text-lg">DigitalVault</span>
        </Link>

        {/* Nav */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      {/* <div className="pt-4 border-t border-gray-200 mx-6 pb-10">
        <div className="flex w-full items-center justify-between px-4 py-2 rounded-lg transition text-gray-600 hover:bg-gray-100">
          <div className="flex gap-3">
            <Settings />
            Settings
          </div>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div> */}
    </aside>
  );
}

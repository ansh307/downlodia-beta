// app/admin/layout.tsx
// This provides a different layout for admin pages
// All /admin/* routes will use this layout

"use client";
import InnerFooter from "@/components/admin/InnerFooter";
import InnerNav from "@/components/admin/InnerNav";
import Sidebar from "@/components/admin/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Don't show admin sidebar on the access page
  if (pathname === "/admin-access") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        {/* Top Navbar */}
        <InnerNav />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Toaster position="top-right" richColors closeButton />
          {children}
        </main>

        {/* Footer */}
        <InnerFooter />
      </div>
    </div>
  );
}

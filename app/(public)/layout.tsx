// app/(public)/layout.tsx
// This layout ONLY applies to routes inside (public) folder
// The URL won't have /public in it

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ScrollHandler from "@/components/ScrollHandler";
import { Toaster } from "sonner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // No extra wrapper needed unless you want specific styling
    <div className="public-container">
      <Navbar />
      <ScrollHandler />
      {children}
      {/* ✅ Add this once globally */}
      <Toaster position="top-right" richColors closeButton />
      <Footer />
    </div>
  );
}

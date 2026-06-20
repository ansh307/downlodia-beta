import BrowseCategory from "@/components/BrowseCategory";
import BundleSection from "@/components/BundleSection";
import CTASection from "@/components/CTASection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import NewReleases from "@/components/NewReleases";
import ProductList from "@/components/products/ProductList";
import Testimonials from "@/components/Testimonials";
import TrustedSection from "@/components/TrustedSection";
import { getHomepageProducts } from "@/lib/actions";

export default async function Home() {
  const { featured, newReleases } = await getHomepageProducts();
  return (
    <main>
      <Hero />
      {/* <ProductList /> */}
      <FeaturedProducts visibleProducts={featured} />
      <BrowseCategory />
      <BundleSection />
      <Testimonials />
      <NewReleases visibleProducts={newReleases} />
      <TrustedSection />
      <CTASection />
    </main>
  );
}

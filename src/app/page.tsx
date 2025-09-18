import CategoriesSection from "@/components/Home/CategoriesSection";
import MainSlider from "@/components/Home/MainSlider";
import ProductsSection from "@/components/Home/ProductsSection";
import { SkeletonCard } from "@/components/shared/SkeletonCard";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <MainSlider />
      <Suspense fallback={<SkeletonCard />}>
        <CategoriesSection />
      </Suspense>
      <Suspense fallback={<SkeletonCard />}>
        <ProductsSection />
      </Suspense>
    </>
  );
}

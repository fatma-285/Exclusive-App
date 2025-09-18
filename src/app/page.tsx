import CategoriesSection from "@/Components/Home/CategoriesSection";
import MainSlider from "@/Components/Home/MainSlider";
import ProductsSection from "@/Components/Home/ProductsSection";
import { SkeletonCard } from "@/Components/shared/SkeletonCard";
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

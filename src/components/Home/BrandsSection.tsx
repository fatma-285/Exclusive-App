import React from "react";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "../ui/separator";
import { getBrands } from "@/services/brands.service";
import BrandsSlider from "./BrandsSlider";
import { IBrand } from "@/interfaces/brand.interface";
export default async function BrandsSection() {
  const { data: brands }: { data: IBrand[] } = await getBrands();

  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <SectionTitle title="Brands" subTitle="Browse By brands" />
        <BrandsSlider brands={brands} />
        <Separator />
      </div>
    </section>
  );
}

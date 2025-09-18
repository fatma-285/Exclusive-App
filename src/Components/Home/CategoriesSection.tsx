import React from "react";
import { getCategories } from "@/services/categories.service";
import { ICategory } from "@/interfaces/category.interface";
import CategorySlider from "./CategorySlider";
import SectionTitle from "../shared/SectionTitle";
import { Separator } from "../ui/separator";
export default async function CategoriesSection() {
  const { data: categories }: { data: ICategory[] } = await getCategories();

  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <SectionTitle title="Categories" subTitle="Browse By categories" />
        <CategorySlider categories={categories} />
        <Separator />
      </div>
    </section>
  );
}

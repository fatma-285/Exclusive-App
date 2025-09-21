import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/services/categories.service";
import { ICategory } from "@/interfaces/category.interface";

export default async function CategoriesPage() {
  const { data: categories }: { data: ICategory[] } = await getCategories();
  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <SectionTitle
          title="Our Categories"
          subTitle="Explore Our Categories"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {categories &&
            categories.map((category: ICategory) => (
              <Link key={category._id} href={`/categories/${category._id}`}>
                <Image
                  src={category.image}
                  alt={category.slug}
                  width={250}
                  height={230}
                  loading="lazy"
                  className=" h-[13.625rem] w-[15.625rem] object-contain bg-gray-100 mb-4"
                />
                <h3 className="text-center font-medium">{category.name}</h3>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

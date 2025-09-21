import React from "react";
import SectionTitle from "../../../components/shared/SectionTitle";
import { getBrands } from "@/services/brands.service";
import { IBrand } from "@/interfaces/brand.interface";
import Link from "next/link";
import Image from "next/image";

export default async function BrandsPage() {
  const { data: Brands }: { data: IBrand[] } = await getBrands();
  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <SectionTitle title="Our Brands" subTitle="Explore Our Brands" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {Brands &&
            Brands.map((brand: IBrand) => (
              <Link key={brand._id} href={`/brands/${brand._id}`}>
                <Image
                  src={brand.image}
                  alt={brand.slug}
                  width={250}
                  height={230}
                  loading="lazy"
                  className=" h-[13.625rem] w-[15.625rem] object-contain bg-gray-100 mb-4"
                />
                <h3 className="text-center font-medium">{brand.name}</h3>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}

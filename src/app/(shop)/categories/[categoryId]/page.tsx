import React from "react";
import Image from "next/image";
import { getProducts } from "@/services/products.service";
import { IProduct } from "@/interfaces/product.interface";
import ProductItem from "@/components/Products/ProductItem";
import { ICategory } from "@/interfaces/category.interface";
import { getCategoryDetails } from "@/services/categoryDetails.service";

export default async function CategoryDetails({
  params: { categoryId },
}: {
  params: { categoryId: string };
}) {
  const { data: category }: { data: ICategory } = await getCategoryDetails(
    categoryId
  );
  const { data: products }: { data: IProduct[] } = await getProducts();
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-b border-b-gray-400 mb-12 pb-8">
          <div className="lg:col-span-2 bg-gray-100 flex items-center justify-center">
            <Image
              src={category.image}
              alt={category.slug}
              width={250}
              height={230}
              loading="lazy"
              className=" h-[13.625rem] w-[15.625rem] object-contain bg-gray-100 mb-4"
            />
          </div>
          <div className="lg:col-span-1 ">
            <h1 className="text-2xl font-semibold mb-4">{category.name}</h1>
            <p className="text-sm  pb-4 mb-6">{category.slug}</p>
          </div>
        </div>
        <div className="">
          <h1 className="text-2xl font-extrabold mb-8 ">Category Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
            {products?.filter(
              (product: IProduct) => product.category._id === category._id
            ).length ? (
              products
                .filter(
                  (product: IProduct) => product.category._id === category._id
                )
                .map((product: IProduct) => (
                  <ProductItem key={product._id} product={product} />
                ))
            ) : (
              <h3 className="text-center text-xl font-medium col-span-full text-red-600">
                No Products Found
              </h3>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

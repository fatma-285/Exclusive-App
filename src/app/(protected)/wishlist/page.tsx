import ProductItem from "@/components/Products/ProductItem";
import SectionTitle from "@/components/shared/SectionTitle";
import { IProduct } from "@/interfaces/product.interface";
import { getWishList } from "@/services/wishList.service";
import React from "react";
export const dynamic = "force-dynamic";
export default async function WishListPage() {
  const res = await getWishList();
  console.log(res);
  const products: IProduct[] = Array.isArray(res.data.data)
    ? res.data.data
    : [];
  console.log(products);
  return (
    <section className="py-12 ">
      <div className="container mx-auto">
        <SectionTitle title="Your WishList" subTitle="Explore Your WishList" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-15 mb-15">
          {products ? (
            products?.map((product: IProduct) => (
              <ProductItem key={product._id} product={product} />
            ))
          ) : (
            <div className="flex items-center justify-center h-screen">
              <p className="text-2xl ">Your WishList is Empty</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

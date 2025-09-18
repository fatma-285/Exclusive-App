import { Button } from "@/components/ui/button";
import { IProduct } from "@/interfaces/product.interface";
import { getProductDetails } from "@/services/productDetails.service";
import { Heart, RefreshCcw, Star, Truck } from "lucide-react";
import React from "react";
import ProductSlider from "../ProductSlider";
import AddToCartBtn from "../AddToCartBtn";

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const { data: product }: { data: IProduct } = await getProductDetails(
    productId
  );

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-gray-100 flex items-center justify-center">
            <ProductSlider images={product.images} />
          </div>
          <div className="lg:col-span-1">
            <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
            <span className="block mb-6 text-2xl">{product.price} EGP</span>
            <div className="flex items-center gap-x-1 mb-4">
              <Star className="fill-yellow-400 text-yellow-400 size-4" />
              <span className="font-semibold text-sm text-gray-500">
                {product.ratingsAverage}
              </span>
            </div>
            <p className="text-sm border-b border-b-gray-400 pb-4 mb-6">
              {product.description}
            </p>
            <div className="w-full flex items-center gap-5 mb-10">
              <AddToCartBtn variant={"destructive"} productId={productId} />
              <Button variant={"outline"}>
                <Heart />
              </Button>
            </div>
            <ul className="border border-black/50 divide-y divide-black/50">
              <li className="p-5 flex items-center gap-4">
                <Truck className="size-8" />
                <div className="font-mediume">
                  <p className="mb-2">Free Delivery</p>
                  <span className="text-xs">Free on orders over 2000 EGP</span>
                </div>
              </li>
              <li className="p-5 flex items-center gap-4">
                <RefreshCcw className="size-8" />
                <div className="font-mediume">
                  <p className="mb-2">Return Delivery</p>
                  <span className="text-xs">Return allowed in 7 days</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

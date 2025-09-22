"use client";
import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { IProduct } from "../../interfaces/product.interface";
import Link from "next/link";
import AddToCartBtn from "../../app/(shop)/products/AddToCartBtn";
import AddToWishListButton from "@/app/(protected)/wishlist/addToWishListButton";

export default function ProductItem({ product }: { product: IProduct }) {
  // const [isPending, startTransition] = React.useTransition();

  return (
    <div className="shadow-sm py-4 px-6 rounded-sm relative">
      <AddToWishListButton productId={product._id} />
      <picture className="relative group overflow-hidden mb-2">
        <Image
          src={product.imageCover}
          alt={product.title}
          width={270}
          height={250}
          loading="lazy"
          className="w-full h-[15.625rem] object-contain mb-4"
        />

        <AddToCartBtn
          productId={product._id}
          className="w-full absolute bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </picture>
      <Link href={`products/${product._id}`}>
        <h3 className="font-medium mb-2 line-clamp-1">{product.title}</h3>
        <div className="flex items-center justify-between py-2">
          <span className="font-medium text-red-500">{product.price} EGP</span>
          <div className="flex items-center gap-x-1">
            <Star className="fill-yellow-400 text-yellow-400 size-4" />
            <span className="font-semibold text-sm text-gray-500">
              {product.ratingsAverage}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}

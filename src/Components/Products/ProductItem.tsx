import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { IProduct } from "../../interfaces/product.interface";
import Link from "next/link";
import AddToCartBtn from "../../app/(shop)/products/AddToCartBtn";
export default function ProductItem({ product }: { product: IProduct }) {
  return (
    <div className="shadow-sm py-4 px-6 rounded-sm">
      <picture className="relative group overflow-hidden">
        <Link href={`products/${product._id}`}>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={270}
            height={250}
            loading="lazy"
            className="w-full h-[15.625rem] object-contain mb-4"
          />
        </Link>
        <AddToCartBtn
          productId={product._id}
          className="w-full absolute bottom-0 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </picture>
      <Link href={`products/${product._id}`}>
        <h3 className="font-medium mb-2 line-clamp-1">{product.title}</h3>
      </Link>
      <div className="flex items-center justify-between">
        <span className="font-medium text-red-500">{product.price} EGP</span>
        <div className="flex items-center gap-x-1">
          <Star className="fill-yellow-400 text-yellow-400 size-4" />
          <span className="font-semibold text-sm text-gray-500">
            {product.ratingsAverage}
          </span>
        </div>
      </div>
    </div>
  );
}

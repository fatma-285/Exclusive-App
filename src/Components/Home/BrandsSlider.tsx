"use client";
import React from "react";
import { swiperOptions } from "./swiperOptions";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { IBrand } from "@/interfaces/brand.interface";
import Link from "next/link";
export default function BrandsSlider({ brands }: { brands: IBrand[] }) {
  return (
    <Swiper
      {...swiperOptions}
      slidesPerView={1}
      spaceBetween={30}
      autoplay={false}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 15,
        },
        1600: {
          slidesPerView: 6,
          spaceBetween: 20,
        },
      }}
      className="categories-slider mb-20"
    >
      {brands &&
        brands.map((brand) => (
          <SwiperSlide key={brand._id} className="mb-8">
            <Link href={`/brands/${brand._id}`}>
              <Image
                src={brand.image}
                alt={brand.slug}
                width={250}
                height={230}
                loading="lazy"
                className=" h-[13.625rem] w-full object-contain bg-gray-100 mb-4"
              />
              <h3 className="text-center font-medium">{brand.name}</h3>
            </Link>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

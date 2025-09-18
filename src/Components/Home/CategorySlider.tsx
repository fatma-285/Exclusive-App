"use client";
import React from "react";
import { swiperOptions } from "./swiperOptions";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { ICategory } from "@/interfaces/category.interface";
export default function CategorySlider({
  categories,
}: {
  categories: ICategory[];
}) {
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
      {categories &&
        categories.map((cat) => (
          <SwiperSlide key={cat._id} className="mb-8">
            <Image
              src={cat.image}
              alt={cat.name}
              width={270}
              height={250}
              loading="lazy"
              className="w-full h-[15.625rem] object-contain bg-gray-100 mb-4"
            />
            <h3 className="text-center font-medium">{cat.name}</h3>
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

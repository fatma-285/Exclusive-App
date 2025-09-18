"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductSlider({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Thumbs */}
      <div className="md:col-span-1">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={2}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            768: {
              direction: "vertical",
            },
          }}
          className="product-thumbs-slider md:h-[37.5rem]"
        >
          {images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`thumb-${idx}`}
                width={100}
                height={100}
                className="mx-auto w-full h-24 md:h-32 object-contain cursor-pointer border border-gray-200 hover:border-red-500 transition"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Main slider */}
      <div className="md:col-span-2">
        <Swiper
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Thumbs]}
          className="product-main-slider mb-6"
        >
          {images?.map((img, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={img}
                alt={`product-image-${idx}`}
                width={600}
                height={600}
                className="mx-auto w-full h-64 md:h-[37.5rem] object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

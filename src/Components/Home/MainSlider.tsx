"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import slider1 from "@/assets/images/slider-image-1.jpeg";
import slider2 from "@/assets/images/slider-image-2.jpeg";
import slider3 from "@/assets/images/slider-image-3.jpeg";
import { swiperOptions } from "./swiperOptions";

export default function MainSlider() {
  const images = [
    {
      path: slider1.src,
      label: "Slide 1",
    },
    {
      path: slider2.src,
      label: "Slide 2",
    },
    {
      path: slider3.src,
      label: "Slide 3",
    },
  ];
  return (
    <section>
      <div className="container mx-auto">
        <Swiper {...swiperOptions}>
          {images.map((image, idx) => (
            <SwiperSlide key={idx}>
              <Image
                src={image.path}
                alt=""
                width={1920}
                height={344}
                loading="lazy"
                className="w-full h-[21.5rem] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

"use client";
import Image from "next/image";
import React from "react";
import errorImg from "../assets/images/error.svg";
export default function Error({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold ">Something went wrong</h1>
      <p className="text-red-500 font-medium">{error.message}</p>
      <Image src={errorImg} alt="error" width={500} height={500} />
    </div>
  );
}

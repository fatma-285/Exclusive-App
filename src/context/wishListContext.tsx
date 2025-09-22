"use client";
import { IProductsResponse } from "@/interfaces/product.interface";
import { getWishList } from "@/services/wishList.service";
import { createContext, useContext, useEffect, useState } from "react";

interface IWishListContext {
  WishListDetails: IProductsResponse | null;
  setWishListDetails: React.Dispatch<
    React.SetStateAction<IProductsResponse | null>
  >;
  getWishListDetails: () => Promise<void>;
}

const wishlistContext = createContext<IWishListContext | null>(null);

export default function WishlistContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [WishListDetails, setWishListDetails] =
    useState<IProductsResponse | null>(null);
  async function getWishListDetails() {
    console.log("getWishListDetails");
    const { data }: { data: IProductsResponse } = await getWishList();
    console.log("data from wishlist", data);

    setWishListDetails(data);
  }
  useEffect(() => {
    getWishListDetails();
  }, []);
  return (
    <wishlistContext.Provider
      value={{ WishListDetails, setWishListDetails, getWishListDetails }}
    >
      {children}
    </wishlistContext.Provider>
  );
}

export function useWishList() {
  const context = useContext(wishlistContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

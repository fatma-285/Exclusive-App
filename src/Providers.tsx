"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import CartContextProvider from "./context/cartContext";
import WishlistContextProvider from "./context/wishListContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WishlistContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  );
}

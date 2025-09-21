"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import CartContextProvider from "./context/cartContext";
import WishlistContextProvider from "./context/wishListContext";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}) {
  return (
    <SessionProvider session={session}>
      <WishlistContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </WishlistContextProvider>
    </SessionProvider>
  );
}

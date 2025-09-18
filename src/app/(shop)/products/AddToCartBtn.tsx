"use client";
import React, { useTransition } from "react";
import { Button } from "@/Components/ui/button";
import { addToCart } from "@/services/cart.service";
import { toast } from "sonner";
import { useCart } from "@/context/cartContext";
import { Loader } from "lucide-react";

export default function AddToCartBtn({
  productId,
  ...props
}: {
  productId: string;
  [key: string]: string;
}) {
  const [isPending, startTransition] = useTransition();
  const { getCartDetails } = useCart();
  async function addItemToCart(productId: string) {
    startTransition(async () => {
      const res = await addToCart(productId);
      if (res.message === "success") {
        toast.success(res.message, {
          position: "top-center",
        });
        getCartDetails();
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
      }
    });
  }
  return (
    <Button onClick={() => addItemToCart(productId)} {...props}>
      {isPending ? <Loader className="animate-spin" /> : "Add to Cart"}
    </Button>
  );
}

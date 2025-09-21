"use client";
import { Button } from "@/components/ui/button";
import { useWishList } from "@/context/wishListContext";
import { addToWishList } from "@/services/wishList.service";
import { Heart, Loader } from "lucide-react";
import React, { useTransition } from "react";
import { toast } from "sonner";
import { removeFromWishList } from "@/services/wishList.service";

export default function AddToWishListButton({
  productId,
}: {
  productId: string;
}) {
  const { WishListDetails, setWishListDetails } = useWishList();
  const [isPending, startTransition] = useTransition();
  async function addProductToWishList(productId: string) {
    startTransition(async () => {
      const res = await addToWishList(productId);
      if (res.message === "success") {
        toast.success(res.message, {
          position: "top-center",
        });
        setWishListDetails(res.data);
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
      }
    });
  }
  async function removeProductFromWishList(productId: string) {
    startTransition(async () => {
      const res = await removeFromWishList(productId);
      if (res.message === "success") {
        toast.success(res.message, {
          position: "top-center",
        });
        setWishListDetails(res.data);
      } else {
        toast.error(res.message, {
          position: "top-center",
        });
      }
    });
  }
  const inWishList = WishListDetails?.data.some(
    (item) => item._id === productId
  );
  return (
    <Button
      variant={"ghost"}
      className="top-3 right-3 absolute"
      onClick={() =>
        inWishList
          ? removeProductFromWishList(productId)
          : addProductToWishList(productId)
      }
    >
      {isPending ? (
        <Loader className="animate-spin" />
      ) : (
        <Heart
          className={`absolute size-5 ${
            inWishList ? "fill-red-500 text-red-500" : "text-red-500"
          }`}
        />
      )}
    </Button>
  );
}

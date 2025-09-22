import { getUserToken } from "../lib/server.utils";

export async function getWishList() {
  try {
    const token = await getUserToken();
    console.log("token from wishlist", token);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token?.token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "something went wrong in showing wishlist",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "wishlist fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong in showing wishlist",
    };
  }
}

export async function addToWishList(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token?.token as string,
        },
        body: JSON.stringify({ productId }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "something went wrong in adding to wishlist",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "added to wishlist successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message:
        (error as string) || "something went wrong in adding to wishlist",
    };
  }
}

export async function removeFromWishList(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token?.token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message:
          data.message ||
          "something went wrong in removing product from wishlist",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "product removed from wishlist successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message:
        (error as string) ||
        "something went wrong in removing product from wishlist",
    };
  }
}

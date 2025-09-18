"use server";

import { getUserToken } from "@/lib/server.utils";

export async function getUserCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
      {
        headers: {
          token: token?.token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "something went wrong",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "cart fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong",
    };
  }
}
export async function removeAllCart() {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
      {
        method: "DELETE",
        headers: {
          token: token?.token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "something went wrong in removing cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "cart removed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong in removing cart",
    };
  }
}

export async function removeFromCart(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "DELETE",
        headers: {
          token: token?.token as string,
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "something went wrong in removing Product",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "Product removed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong in removing Product",
    };
  }
}

export async function addToCart(productId: string) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart`,
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
        message: data.message || "something went wrong in adding to cart",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "added to cart successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong in adding to cart",
    };
  }
}
export async function updateItemQty(productId: string, count: number) {
  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token?.token as string,
        },
        body: JSON.stringify({ count }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        data: null,
        success: false,
        message:
          data.message || "something went wrong in updating product quantity",
      };
    }
    return {
      data: data,
      success: true,
      message: data.message || "product quantity updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message:
        (error as string) ||
        "something went wrong in updating product quantity",
    };
  }
}

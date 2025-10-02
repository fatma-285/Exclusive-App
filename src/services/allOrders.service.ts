import { getUserToken } from "@/lib/server.utils";

export async function getUserOrders() {
  try {
    const token = await getUserToken();
    console.log("id ", token?.sub);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/user/${token?.sub}`
    );
    const data = await res.json();

    if (!res.ok) {
      return {
        data: null,
        success: false,
        message: data.message || "something went wrong in showing orders",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "all orders fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong in showing orders",
    };
  }
}
export async function getAllOrders() {
  const token = await getUserToken();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/`,
      {
        method: "GET",
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
        message: data.message || "something went wrong in showing orders",
      };
    }

    return {
      data: data,
      success: true,
      message: data.message || "all orders fetched successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      success: false,
      message: (error as string) || "something went wrong in showing orders",
    };
  }
}

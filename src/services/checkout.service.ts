"use server";
import { getUserToken } from "../lib/server.utils";
import {
  addressFormSchema,
  addressFormStateType,
} from "@/schema/address.schema";

export async function handlePayment(
  formState: addressFormStateType,
  formData: FormData
): Promise<addressFormStateType> {
  const ShippingAddress = {
    details: formData.get("details"),
    city: formData.get("city"),
    phone: formData.get("phone"),
  };
  const cartId = formData.get("cartId");
  const paymentMethod = formData.get("paymentMethod") as "cash" | "card";

  const parsedData = addressFormSchema.safeParse({
    ...ShippingAddress,
    cartId,
    paymentMethod,
  });

  if (!parsedData.success) {
    return {
      success: false,
      error: parsedData.error?.flatten().fieldErrors,
      message: null,
      paymentMethod,
    };
  }

  try {
    const token = await getUserToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token?.token as string,
        },
        body: JSON.stringify({ ShippingAddress }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to place order",
        callbackUrl: "/cart",
        paymentMethod,
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "order placed successfully",
      callbackUrl: paymentMethod === "cash" ? "/allorders" : data.url,
      paymentMethod,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "Failed to place order",
      paymentMethod,
    };
  }
}

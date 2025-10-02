"use server";

import { getUserToken } from "@/lib/server.utils";
import { FormState, profileDataFormSchema } from "../schema/profile.schema";

export async function handleUpdateMe(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  const ParsedValues = profileDataFormSchema.safeParse(formValues);
  if (!ParsedValues.success) {
    return {
      success: false,
      error: ParsedValues.error.flatten().fieldErrors,
      message: null,
    };
  }

  try {
    const token = await getUserToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users/updateMe/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token?.token as string,
        },
        body: JSON.stringify(ParsedValues.data),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: {},
        message: data.message || "Failed to update profile",
      };
    }

    return {
      success: true,
      error: {},
      message: data.message || "Profile updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong, please try again",
    };
  }
}

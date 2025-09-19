"use server";

import { FormState, registerFormSchema } from "../schema/register.schema";

export async function handleRegister(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const formValues = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    rePassword: formData.get("rePassword"),
    phone: formData.get("phone"),
  };
  const ParsedValues = registerFormSchema.safeParse(formValues);
  if (!ParsedValues.success) {
    return {
      success: false,
      error: ParsedValues.error?.flatten().fieldErrors,
      message: null,
    };
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        error: data.message,
        message: data.message,
      };
    }
    return {
      success: true,
      error: {},
      message: data.message,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: {},
      message: (error as string) || "something went wrong",
    };
  }
}

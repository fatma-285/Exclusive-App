export async function handleForgotPassword(email: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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

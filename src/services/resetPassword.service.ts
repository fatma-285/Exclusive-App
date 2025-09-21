export async function handleResetPassword(email: string, newPassword: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
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
    return {
      success: true,
      error: {},
      message: (error as string) || "something went wrong",
    };
  }
}

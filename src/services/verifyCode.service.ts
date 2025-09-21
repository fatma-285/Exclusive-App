export async function handleVerificationCode(resetCode: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resetCode }),
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

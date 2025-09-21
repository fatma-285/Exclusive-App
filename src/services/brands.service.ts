export async function getBrands() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}

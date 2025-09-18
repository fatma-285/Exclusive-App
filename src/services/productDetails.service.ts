export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products/${id}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch product");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}

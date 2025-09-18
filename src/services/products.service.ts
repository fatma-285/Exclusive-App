export async function getProducts(limit = 40) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/products?limit=${limit}`,
      {
        cache: "no-cache",
        // next:{
        //   revalidate: 120, tags: ["products"]
        // }
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch products");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}

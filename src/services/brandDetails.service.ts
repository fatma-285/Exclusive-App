export async function getBrandDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/brands/${id}`,
      {
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(res.statusText || "Failed to fetch braand");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: error as string };
  }
}

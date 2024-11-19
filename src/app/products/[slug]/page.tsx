import ProductDetail from "@/screens/ProductDetail";
import { API_URL } from "@/utils/const";
import logger from "@/utils/logger";
import { notFound } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const id = slug?.match(/p(\d+)\.html/)?.[1];
  const res = await fetch(`${API_URL}/nail/products/?product_id=${id}`);
  const data = await res.json();

  return {
    title: data?.data.name + " - Gạo Nails",
  };
}
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const { slug } = params;
    const id = slug?.match(/p(\d+)\.html/)?.[1];
    logger.info(
      `ProductDetailPage: ${API_URL}/nail/products/?product_id=${id}`
    );
    const res = await fetch(`${API_URL}/nail/products/?product_id=${id}`);
    const data = await res.json();

    return <ProductDetail productDetail={data?.data} />;
  } catch (error) {
    logger.error("ProductDetailPage: " + error);
    return notFound();
  }
}

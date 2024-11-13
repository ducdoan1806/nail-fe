import Products from "@/screens/Products";
import { API_URL } from "@/utils/const";
import logger from "@/utils/logger";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Products - Gạo Nails",
};

export default async function ProductsPage() {
  logger.info(`${API_URL}/nail/products/?page=1&page_size=8`);
  try {
    const res = await fetch(`${API_URL}/nail/products/?page=1&page_size=8`);
    const data = await res.json();
    return <Products products={data.results} />;
  } catch (error) {
    logger.error(error);
    return notFound();
  }
}

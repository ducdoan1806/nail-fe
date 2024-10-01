import Products from "@/screens/Products";
import { API_URL } from "@/utils/const";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - NailGlam",
};

export default async function ProductsPage() {
  const res = await fetch(`${API_URL}/nail/products/?page=1&page_size=10`);
  const data = await res.json();
  return <Products products={data.results} />;
}

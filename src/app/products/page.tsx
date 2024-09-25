import Products from "@/screens/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - NailGlam",
};

export default async function ProductsPage() {
  const res = await fetch(
    "https://66f3d68777b5e88970971328.mockapi.io/products"
  );
  const data = await res.json();

  return <Products products={data} />;
}

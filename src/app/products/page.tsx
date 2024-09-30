import Products from "@/screens/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products - NailGlam",
};

export default async function ProductsPage() {
  return <Products />;
}

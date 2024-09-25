import { ProductType } from "@/models/model";
import ProductDetail from "@/screens/ProductDetail";
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const res = await fetch(
    `https://66f3d68777b5e88970971328.mockapi.io/products`
  );
  const data = await res.json();
  const productDetail = data.find(
    (item: ProductType) => item.id === Number(id)
  );
  console.log("productDetail: ", productDetail);
  return {
    title: productDetail.name + " - NailGlam",
  };
}
export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(
    `https://66f3d68777b5e88970971328.mockapi.io/products`
  );
  const data = await res.json();
  const productDetail = data.find(
    (item: ProductType) => item.id === Number(id)
  );
  return <ProductDetail productDetail={productDetail} />;
}

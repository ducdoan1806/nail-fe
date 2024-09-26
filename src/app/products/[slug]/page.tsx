import { ProductType } from "@/models/model";
import ProductDetail from "@/screens/ProductDetail";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const id = slug?.match(/p(\d+)\.html/)?.[1];
  const res = await fetch(
    `https://66f3d68777b5e88970971328.mockapi.io/products`
  );
  const data = await res.json();
  const productDetail = data.find(
    (item: ProductType) => item.id === Number(id)
  );

  return {
    title: productDetail.name + " - NailGlam",
  };
}
export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const id = slug?.match(/p(\d+)\.html/)?.[1];

  const res = await fetch(
    `https://66f3d68777b5e88970971328.mockapi.io/products`
  );
  const data = await res.json();
  const productDetail = data.find(
    (item: ProductType) => item.id === Number(id)
  );
  return <ProductDetail productDetail={productDetail} />;
}

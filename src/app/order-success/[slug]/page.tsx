import OrderSuccessContent from "@/screens/OrderSuccessContent";
import { API_URL } from "@/utils/const";
import { notFound } from "next/navigation";

export default async function OrderSuccessPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const match = params.slug.match(/p(\d+)\.html/);
    let orderNumber = "";

    if (match) {
      orderNumber = match[1];
    }
    const res = await fetch(`${API_URL}/nail/order/${orderNumber}/`);
    const data = await res.json();

    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-100">
        <OrderSuccessContent
          orderCode={data?.data?.order_code}
          name={data?.data?.name}
          phone={data?.data?.phone}
          address={data?.data?.address}
          note={data?.data?.note}
        />
      </div>
    );
  } catch (error) {
    console.log("error: ", error);
    return notFound();
  }
}

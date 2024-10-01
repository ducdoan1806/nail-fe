import OrderSuccessContent from "@/screens/OrderSuccessContent";

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100">
      <OrderSuccessContent orderNumber="12345" estimatedTime="2:00 PM" />
    </div>
  );
}

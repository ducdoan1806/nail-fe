import Link from "next/link";

interface OrderSuccessContentProps {
  orderCode: string;
  name: string;
  phone: string;
  address: string;
  note: string;
}

export default function OrderSuccessContent(props: OrderSuccessContentProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="text-center space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-md w-full mx-4">
        <div className="text-6xl text-pink-500 flex justify-center space-x-4">
          <i className="fas fa-check-circle animate-bounce"></i>
        </div>
        <h1 className="text-4xl font-bold text-pink-700">Order Successful!</h1>
        <p className="text-xl text-pink-600">
          Thank you for your order. We can&apos;t wait to pamper your nails!
        </p>
        <div className="text-left space-y-2">
          <p className="text-pink-600">
            <strong>Order Number:</strong> #{props?.orderCode ?? "--"}
          </p>
          <p className="text-pink-600">
            <strong>Name:</strong> {props?.name ?? "--"}
          </p>
          <p className="text-pink-600">
            <strong>Phone:</strong> {props?.phone ?? "--"}
          </p>
          <p className="text-pink-600">
            <strong>Address:</strong> {props?.address ?? "--"}
          </p>
          <p className="text-pink-600">
            <strong>Note:</strong> {props?.note ?? "--"}
          </p>
        </div>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition duration-300 w-full"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

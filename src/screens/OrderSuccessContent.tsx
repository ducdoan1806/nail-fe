"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface OrderSuccessContentProps {
  orderNumber: string;
  estimatedTime: string;
}

export default function OrderSuccessContent({
  orderNumber,
  estimatedTime,
}: OrderSuccessContentProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20 + 10}%`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <i
                className={`fas fa-${
                  ["heart", "star", "circle", "square"][
                    Math.floor(Math.random() * 4)
                  ]
                } text-${
                  ["pink", "purple", "red", "yellow"][
                    Math.floor(Math.random() * 4)
                  ]
                }-400`}
              ></i>
            </div>
          ))}
        </div>
      )}
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
            <strong>Order Number:</strong> {orderNumber}
          </p>
          <p className="text-pink-600">
            <strong>Estimated Time:</strong> {estimatedTime}
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

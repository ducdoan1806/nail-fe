import Payment from "@/screens/Payment";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Payment - NailGlam",
};

export default function PaymentPage() {
  return <Payment />;
}

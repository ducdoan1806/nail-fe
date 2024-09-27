import Payment from "@/screens/Payment";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Payment - NailGlam",
};

export default async function PaymentPage() {
  const res = await fetch("https://provinces.open-api.vn/api/p/");
  const citys = await res.json();
  return <Payment citys={citys} />;
}

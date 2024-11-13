import Payment from "@/screens/Payment";
import { API_URL } from "@/utils/const";
import logger from "@/utils/logger";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Payment - Gạo Nails",
};

export default async function PaymentPage() {
  logger.info(`${API_URL}/nail/address/`);
  try {
    const res = await fetch(`${API_URL}/nail/address/`);
    const data = await res.json();
    return <Payment citys={data?.data} />;
  } catch (error) {
    logger.error(error);
    redirect("/not-found");
  }
}

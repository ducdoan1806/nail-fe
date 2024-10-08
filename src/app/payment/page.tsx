import { CityType } from "@/models/model";
import Payment from "@/screens/Payment";
import fetchHttps from "@/utils/https";
import logger from "@/utils/logger";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";
export const metadata: Metadata = {
  title: "Payment - Gạo Nails",
};

export default async function PaymentPage() {
  try {
    const citys = await fetchHttps<CityType[]>(
      "https://provinces.open-api.vn/api/p/"
    );
    return <Payment citys={citys} />;
  } catch (error) {
    logger.error(error);
    redirect("/not-found");
  }
}

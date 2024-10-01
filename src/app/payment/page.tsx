import Payment from "@/screens/Payment";
import { Metadata } from "next";
import React from "react";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Payment - NailGlam",
};

export default async function PaymentPage() {
  try {
    const res = await fetch("https://provinces.open-api.vn/api/p/");

    // Check if the response is ok (status code 200-299)
    if (!res.ok) {
      // If the response is not ok, navigate to the 404 page
      redirect("/not-found");
    }

    const citys = await res.json();

    return <Payment citys={citys} />;
  } catch (error) {
    console.error("Failed to fetch city data:", error);
    // If there is an error in fetching data, navigate to the not-found page
    redirect("/not-found");
  }
}

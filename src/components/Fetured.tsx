import React from "react";
import FeturedItem from "./FeturedItem";
import { ProductType } from "@/models/model";
import { API_URL } from "@/utils/const";
import { notFound } from "next/navigation";
import logger from "@/utils/logger";

export default async function Fetured() {
  try {
    logger.info(`Fetured: ${API_URL}/nail/products/?page=1&page_size=8`);
    const res = await fetch(`${API_URL}/nail/products/?page=1&page_size=8`);
    const data = await res.json();
    const feturedData = data?.results;

    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-pink-600 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {feturedData.map((item: ProductType) => (
              <FeturedItem key={item?.id} {...item} />
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.log("error: ", error);
    logger.error("Fetured: " + error);
    return notFound();
  }
}

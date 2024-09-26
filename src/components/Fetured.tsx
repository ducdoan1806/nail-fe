import React from "react";
import FeturedItem from "./FeturedItem";
import { ProductType } from "@/models/model";

export default async function Fetured() {
  const res = await fetch(
    "https://66f3d68777b5e88970971328.mockapi.io/products"
  );
  const data = await res.json();

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.slice(0, 4).map((item: ProductType) => (
            <FeturedItem key={item?.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

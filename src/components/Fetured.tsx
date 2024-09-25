import React from "react";
import FeturedItem from "./FeturedItem";

export default function Fetured() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <FeturedItem key={item} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

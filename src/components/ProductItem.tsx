import { ProductType } from "@/models/model";
import { createProductUrl } from "@/utils/const";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductItem(product: ProductType) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={product?.images[0]?.image}
        alt={product?.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{product?.name}</h2>

        <div className="flex items-center mb-2">
          <span className="text-yellow-500 mr-1">
            <i className="fas fa-star" aria-hidden="true"></i>
          </span>
          <span>{product?.rating}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">${product?.mini_price}</span>
          <Link
            href={createProductUrl(product.name, product.id)}
            className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
          >
            <i className="fas fa-shopping-cart mr-2" aria-hidden="true"></i>
            Add to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}

import { ProductType } from "@/models/model";
import { convertSlugUrl } from "@/utils/const";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FeturedItem(props: ProductType) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={props?.image}
        alt={props?.name}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <Link
          href={`/products/${convertSlugUrl(props.name)}-p${props?.id}.html`}
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-pink-600">
            {props?.name}
          </h3>
        </Link>
        <p className="text-gray-600 mb-4">
          High-quality, long-lasting nail polish set with vibrant colors.
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-pink-600">$19.99</span>
          <button className="bg-pink-600 text-white py-2 px-4 rounded-full hover:bg-pink-700 transition duration-300">
            <i className="fas fa-cart-plus mr-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

import { ProductType } from "@/models/model";
import { API_URL, createProductUrl, formattedMoney } from "@/utils/const";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function FeturedItem(props: ProductType) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={API_URL +"/"+ props?.images[0]?.image}
        alt={props?.name}
        width={300}
        height={300}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {props?.name}
        </h3>

        <p className="text-gray-600 mb-4 truncate">{props?.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-pink-600">
            {formattedMoney(props?.mini_price)}
          </span>
          <Link
            href={createProductUrl(props.name, props.id)}
            className="bg-pink-600 text-white py-2 px-4 rounded-full hover:bg-pink-700 transition duration-300"
          >
            View more <i className="ml-2 fa-solid fa-angles-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import React from "react";
import imgTest from "@/app/test.jpg";
export default function Hero() {
  return (
    <section className="bg-pink-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-3">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Discover Your Perfect Nail Look
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            Explore our wide range of high-quality nail products for stunning,
            long-lasting manicures.
          </p>
          <Link
            href={"/products"}
            className="bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition duration-300 inline-block"
          >
            Shop Now
          </Link>
        </div>
        <div className="md:w-1/2">
          <Image
            src={imgTest}
            alt="Nail products showcase"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

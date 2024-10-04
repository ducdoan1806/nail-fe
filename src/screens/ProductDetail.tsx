"use client";
import { useCart } from "@/contexts/CartContext";
import { ProductType } from "@/models/model";
import { API_URL, formattedMoney } from "@/utils/const";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductDetail({
  productDetail,
}: {
  productDetail: ProductType;
}) {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const cartItem = cartItems.find((item) => item?.id === productDetail?.id);
  const [largeImg, setLargeImg] = useState(productDetail?.images[0]?.image);

  const [product, setProduct] = useState({
    id: productDetail?.id,
    name: productDetail?.name,
    colorCode: productDetail?.detail_products[0]?.color_code,
    colorName: productDetail?.detail_products[0]?.color_name,
    price: productDetail?.detail_products[0]?.price,
    quantity: cartItem?.quantity || 1,
    productDetailId: productDetail?.detail_products[0]?.id,
  });

  const updateCart = (id: number, number: number) => {
    setProduct({ ...product, quantity: number });
    updateQuantity(id, number);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image
              src={`${API_URL}/${largeImg}`}
              alt={productDetail?.name}
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {productDetail?.images.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden border  ${
                  item?.image === largeImg ? "border-pink-400" : "s"
                }`}
                onClick={() => {
                  setLargeImg(item?.image);
                }}
              >
                <Image
                  src={`${API_URL}/${item?.image}`}
                  alt={`Product image ${item}`}
                  width={150}
                  height={150}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {productDetail?.name}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <i key={star} className="fas fa-star"></i>
              ))}
            </div>
          </div>
          <p className="text-2xl font-bold text-pink-600 mb-4">
            {formattedMoney(product?.price)}
          </p>
          <p className="text-gray-600 mb-6">{productDetail?.description}</p>

          {/* Color Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Select Color:
            </h2>
            <div className="flex space-x-2">
              {productDetail?.detail_products.map((detail) => {
                return (
                  <button
                    key={detail?.id}
                    title={detail?.color_name}
                    onClick={() => {
                      setProduct({
                        ...product,
                        price: detail?.price,
                        colorCode: detail?.color_code,
                        colorName: detail?.color_name,
                        productDetailId: detail?.id,
                      });
                    }}
                    className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                      product?.colorCode === detail?.color_code
                        ? "ring-2 ring-pink-500 ring-offset-2"
                        : ""
                    }`}
                    style={{
                      backgroundColor: detail?.color_code.toLowerCase(),
                    }}
                    aria-label={`Select ${detail?.color_code}`}
                  ></button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Quantity:
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  updateCart(
                    productDetail.id,
                    Math.max(1, product.quantity - 1)
                  )
                }
                className="bg-pink-500 text-white hover:bg-pink-600 px-2 py-1 rounded-full"
                aria-label="Decrease quantity"
              >
                <i className="fas fa-minus"></i>
              </button>
              <span className="text-xl font-semibold">
                {cartItem?.quantity || product?.quantity}
              </span>
              <button
                onClick={() =>
                  updateCart(
                    productDetail.id,
                    Math.max(1, product.quantity + 1)
                  )
                }
                className="bg-pink-500 text-white hover:bg-pink-600 px-2 py-1 rounded-full"
                aria-label="Increase quantity"
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-full hover:bg-pink-700 transition duration-300"
            onClick={() => {
              addToCart(product);
            }}
          >
            <i className="fas fa-cart-plus mr-2"></i>Add to Cart
          </button>

          {productDetail?.detail && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Product Details:
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {productDetail?.detail &&
                  typeof productDetail?.detail === "object" &&
                  JSON.parse(productDetail?.detail).map(
                    (item: string, idx: number) => (
                      <li key={idx}>Set includes 4 nail polish colors</li>
                    )
                  )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

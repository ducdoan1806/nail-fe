"use client";
import { useCart } from "@/contexts/CartContext";
import { ProductType } from "@/models/model";
import Image from "next/image";
import React, { useState } from "react";

export default function ProductDetail({
  productDetail,
}: {
  productDetail: ProductType;
}) {
  const { addToCart, updateQuantity, cartItems } = useCart();
  const cartItem = cartItems.find((item) => item?.id === productDetail?.id);
  const [selectedColor, setSelectedColor] = useState("Red");
  const [product, setProduct] = useState({
    id: productDetail?.id,
    name: productDetail?.name,
    price: productDetail?.price,
    quantity: cartItem?.quantity || 1,
  });
  const colors = ["Red", "Pink", "Purple", "Blue"];
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
              src={productDetail?.image}
              alt={productDetail?.name}
              width={600}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Image
                  src={`/placeholder.svg?height=150&width=150&text=Image ${item}`}
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
            <span className="ml-2 text-gray-600">(42 reviews)</span>
          </div>
          <p className="text-2xl font-bold text-pink-600 mb-4">
            $ {productDetail?.price}
          </p>
          <p className="text-gray-600 mb-6">
            Experience a burst of color with our Vibrant Nail Polish Set. This
            collection features four stunning shades that are perfect for any
            occasion. Long-lasting, chip-resistant, and easy to apply, these
            polishes will keep your nails looking fabulous for days.
          </p>

          {/* Color Selection */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Select Color:
            </h2>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 ${
                    selectedColor === color ? "ring-2 ring-pink-500" : ""
                  }`}
                  style={{ backgroundColor: color.toLowerCase() }}
                  aria-label={`Select ${color}`}
                ></button>
              ))}
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

          {/* Product Details */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Product Details:
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>Set includes 4 nail polish colors</li>
              <li>Long-lasting formula</li>
              <li>Chip-resistant</li>
              <li>Quick-drying</li>
              <li>Cruelty-free and vegan</li>
              <li>15ml / 0.5 fl oz each</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

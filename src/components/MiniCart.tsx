import { useCart } from "@/contexts/CartContext";
import { useOutside } from "@/utils/useOutside";
import Link from "next/link";
import React, { useRef } from "react";
type MiniCartProps = {
  closeCart: () => void;
};
export default function MiniCart({ closeCart }: MiniCartProps) {
  const { cartItems, updateQuantity, total } = useCart();
  const ref = useRef(null);
  useOutside(ref, closeCart);
  return (
    <div
      className="absolute bg-white rounded-lg shadow-md w-96 -right-2 p-3 top-full"
      ref={ref}
    >
      {cartItems.length === 0 ? (
        <div className="text-center text-pink-600">Giỏ hàng trống</div>
      ) : (
        <>
          <div className="flex items-center justify-between pb-1 mb-2 border-gray-200 border-b">
            <p className="text-base font-semibold text-pink-800">Cart</p>
            <span className="text-base text-pink-800">${total}</span>
          </div>
          <ul className="space-y-4 max-h-96 overflow-auto">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-1 items-center border-b border-gray-100 pb-2 text-sm"
              >
                <span className="text-gray-800 truncate">{item.name}</span>
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <i className="fas fa-minus"></i>
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value) || 0)
                      }
                      className="w-8 text-center mx-2 border border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-pink-500"
                    />
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <i className="fas fa-plus"></i>
                    </button>
                  </div>
                  <span className="text-gray-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href={"/payment"}
            className="block text-center mt-3 p-2 w-full bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-full"
            onClick={closeCart}
          >
            Đặt hàng ngay
          </Link>
        </>
      )}
    </div>
  );
}

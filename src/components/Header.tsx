"use client";
import { menu } from "@/utils/const";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MiniCart from "./MiniCart";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import logo from "@/app/logo.svg";
import Image from "next/image";

export default function Header() {
  const [openCart, setOpenCart] = useState(false);
  const { cartItems } = useCart();
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fas fa-bars text-xl md:hidden"></i>
          <a href="/">
            <h1 className="text-2xl font-bold text-pink-600">
              <Image src={logo} alt="" className="w-14 h-auto" />
            </h1>
          </a>
        </div>
        <nav className="hidden md:flex gap-4">
          {menu.map((item, idx) => (
            <Link
              key={idx}
              href={item.path}
              className={`text-gray-600 hover:text-pink-600${
                pathname.split("/")[1] === item.path.split("/")[1]
                  ? " text-pink-600 font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button>
            <i className="fas fa-search text-xl text-gray-600 hover:text-gray-700"></i>
          </button>
          <div className="relative">
            <button
              className="relative"
              onClick={() => {
                setOpenCart(!openCart);
              }}
            >
              <i className="fas fa-shopping-cart text-xl text-gray-600 hover:text-gray-700"></i>
              {cartItems.length ? (
                <span className="absolute shadow-sm text-xs bg-pink-500 text-white w-5 h-5 rounded-full flex justify-center items-center -top-2 -right-2">
                  {cartItems.length}
                </span>
              ) : (
                ""
              )}
            </button>
            {openCart && (
              <MiniCart
                closeCart={() => {
                  setOpenCart(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

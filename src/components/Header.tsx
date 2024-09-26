"use client";
import { menu } from "@/utils/const";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-md sticky top-0">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center">
          <i className="fas fa-bars text-xl md:hidden"></i>
          <a href="/">
            <h1 className="text-2xl font-bold text-pink-600">NailGlam</h1>
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
                  : " "
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <i className="fas fa-search text-xl text-gray-600"></i>
          <i className="fas fa-shopping-cart text-xl text-gray-600"></i>
        </div>
      </div>
    </header>
  );
}

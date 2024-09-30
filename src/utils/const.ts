import { ProductType } from "@/models/model";
import slugify from "slugify";

export const menu = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "#" },
  { name: "Contact", path: "#" },
];
export const products: ProductType[] = [
  {
    id: 1,
    name: "Classic Nail Polish",
    price: 9.99,
    rating: 4.5,
    images: "/placeholder.svg?height=200&width=200",
    type: "polish",
  },
  {
    id: 2,
    name: "Gel Nail Kit",
    price: 29.99,
    rating: 4.8,
    images: "/placeholder.svg?height=200&width=200",
    type: "kit",
  },
  {
    id: 3,
    name: "Nail Art Stickers",
    price: 4.99,
    rating: 4.2,
    images: "/placeholder.svg?height=200&width=200",
    type: "accessories",
  },
  {
    id: 4,
    name: "Nail Strengthener",
    price: 14.99,
    rating: 4.7,
    images: "/placeholder.svg?height=200&width=200",
    type: "treatment",
  },
  {
    id: 5,
    name: "Cuticle Oil",
    price: 7.99,
    rating: 4.6,
    images: "/placeholder.svg?height=200&width=200",
    type: "treatment",
  },
  {
    id: 6,
    name: "Nail File Set",
    price: 6.99,
    rating: 4.3,
    images: "/placeholder.svg?height=200&width=200",
    type: "accessories",
  },
];
export const convertSlugUrl = (str: string) => {
  if (!str) return "";
  return slugify(str, { lower: true, locale: "vi" });
};
export const API_URL = "http://127.0.0.1:8000";

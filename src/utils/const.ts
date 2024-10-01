import slugify from "slugify";

export const menu = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About", path: "#" },
  { name: "Contact", path: "#" },
];

export const convertSlugUrl = (str: string) => {
  if (!str) return "";
  return slugify(str, { lower: true, locale: "vi" });
};
export const createProductUrl = (name: string, id: number) =>
  `/products/${convertSlugUrl(name)}-p${id}.html`;

export const API_URL = "http://127.0.0.1:8000";

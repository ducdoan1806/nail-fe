import slugify from "slugify";

export const menu = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "Contact us", path: "/contacts" },
];
export const socials = [
  {
    icon: "fa-brands fa-facebook",
    name: "Facebook",
  },
  {
    icon: "fa-brands fa-tiktok",
    name: "Tiktok",
  },

  { icon: "fa-solid fa-phone", name: "Phone" },
  { icon: "fa-solid fa-location-dot", name: "Location" },
];

export const convertSlugUrl = (str: string) => {
  if (!str) return "";
  return slugify(str, { lower: true, locale: "vi" });
};
export const createProductUrl = (name: string, id: number) =>
  `/products/${convertSlugUrl(name)}-p${id}.html`;

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const formattedMoney = (money: number) =>
  new Intl.NumberFormat("vi-VN").format(money) + " đ";

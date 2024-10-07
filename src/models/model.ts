export type ImageType = {
  id: number;
  image: string;
  created_at: string;
};
export type ProductDetailType = {
  color_code: string;
  color_name: string;
  id: number;
  price: number;
  quantity: number;
};
export type ProductType = {
  id: number;
  images: ImageType[];
  name: string;
  rating: number;
  mini_price: number;
  type: string;
  detail: string;
  description: string;
  detail_products: ProductDetailType[];
};
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  colorCode: string;
  colorName: string;
  product_detail: number;
};
export type WardType = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  district_code: number;
};
export type DistrictType = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  province_code: number;
  wards: WardType[];
};
export type CityType = {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  districts: DistrictType[];
};

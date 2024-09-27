export type ProductType = {
  id: number;
  image: string;
  name: string;
  rating: number;
  price: number;
  type: string;
};
export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
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

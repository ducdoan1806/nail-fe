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
import { IProduct } from "./product.interface";
export interface IOrderRoot {
  data: IOrderResponse;
  success: boolean;
  message: string | null;
}
export interface IOrderResponse {
  shippingAddress?: IShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: ICartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}

export interface IShippingAddress {
  details: string;
  city: string;
  phone?: string;
  postalCode?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface ICartItem {
  count: number;
  product: IProduct;
  price: number;
  _id: string;
}

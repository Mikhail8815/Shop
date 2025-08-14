import type { CartItem } from "../cart/cartSlice";

export interface DeliveryData {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
  cost: number
}

export type PaymentMethod = 'card' | 'paypal' | 'cash';

export interface Order {
  id: string;
  items: CartItem[];
  delivery: DeliveryData;
  payment: PaymentMethod;
  total: number;
  subtotal: number;
  createdAt: string;
}
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../cart/cartSlice';
import type { Order } from './types';
import type { DeliveryData } from './types';
import type { PaymentMethod } from './types';

interface CheckoutState {
  step: number;
  delivery: DeliveryData | null;
  paymentMethod: PaymentMethod | null;
  order: Order | null;
}

const initialState: CheckoutState = {
  step: 1,
  delivery: null,
  paymentMethod: null,
  order: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setDeliveryData(state, action: PayloadAction<DeliveryData>) {
      state.delivery = action.payload;
      state.step = 2;
    },
    setPaymentMethod(state, action: PayloadAction<PaymentMethod>) {
      state.paymentMethod = action.payload;
      state.step = 3;
    },
    placeOrder(state, action: PayloadAction<{items: CartItem[]; total: number; subtotal: number, deliveryCost: number;}>) {
      if (!state.delivery || !state.paymentMethod) return;
      
      state.order = {
        id: Date.now().toString(),
        items: action.payload.items,
        delivery: {
          ...state.delivery,
          cost: action.payload.deliveryCost
        },
        payment: state.paymentMethod,
        total: action.payload.total,
        subtotal: action.payload.subtotal,
        createdAt: new Date().toISOString(),
      };
      state.step = 4;
    },
    resetCheckout(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { 
  setDeliveryData, 
  setPaymentMethod, 
  placeOrder,
  resetCheckout,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { saveCartMiddleware } from '../features/cart/cartMiddleware';
import { checkoutReducer } from '../features/checkout/checkoutSlice';
import { authReducer } from '../features/auth/authSlice';
import { reviewsApi } from '../services/reviewsApi';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    auth: authReducer,
    [reviewsApi.reducerPath]: reviewsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
          .concat(saveCartMiddleware)
          .concat(reviewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
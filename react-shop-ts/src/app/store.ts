import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { reviewsReducer } from '../features/reviews/reviewsSlice';
import { saveCartMiddleware } from '../features/cart/cartMiddleware';
import { checkoutReducer } from '../features/checkout/checkoutSlice';
import { authReducer } from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
    checkout: checkoutReducer,
    auth: authReducer
  }, 
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(saveCartMiddleware),
});

// Типы для работы с хуками
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
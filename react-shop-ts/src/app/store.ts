import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';
import { cartReducer } from '../features/cart/cartSlice';
import { reviewsReducer } from '../features/reviews/reviewsSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    reviews: reviewsReducer
  }, 
});

// Типы для работы с хуками
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
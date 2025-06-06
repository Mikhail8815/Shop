import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from '../features/products/productsSlice';


export const store = configureStore({
  reducer: {
    products: productsReducer
  }, // Пока пустой
});

// Типы для работы с хуками
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
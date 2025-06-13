import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Review } from "../products/types";



interface ReviewsState {
  byProductId: {
    [productId: number]: Review[];
  };
}

const initialState: ReviewsState = {
  byProductId: {
    1: [
      {
        id: '1',
        productId: 1,
        author: 'Мария',
        rating: 5,
        text: 'Отличный товар!',
        date: '2023-07-15T10:30:00Z'
      },
      {
        id: '2',
        productId: 1,
        author: 'Иван',
        rating: 4,
        text: 'Хорошо, но дорого',
        date: '2023-07-16T14:15:00Z'
      }
    ],
    2: [ // Отзывы для другого товара
      {
        id: '3',
        productId: 2,
        author: 'Анна',
        rating: 3,
        text: 'Средненько',
        date: '2023-07-10T09:45:00Z'
      }
    ]
  },
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: {
      reducer(state, action: PayloadAction<Review>) {
        const { productId } = action.payload;
        if (!state.byProductId[productId]) {
          state.byProductId[productId] = [];
        }
        state.byProductId[productId].unshift(action.payload);
      },
      prepare(review: Omit<Review, 'id' | 'date'>) {
        return {
          payload: {
            ...review,
            id: Date.now().toString(),
            date: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export const reviewsReducer =  reviewsSlice.reducer;
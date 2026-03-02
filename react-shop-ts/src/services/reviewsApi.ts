import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {Review} from "../features/products/types.ts";

export type NewReview = {
    productId: number;
    author: string;
    rating: number;
    text: string;
};

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shop-1-wjdj.onrender.com/api',
        // Для локальной разработки можно переключать:
        // baseUrl: process.env.NODE_ENV === 'production'
        //   ? 'https://shop-1-wjdj.onrender.com/api'
        //   : 'http://localhost:5000/api',
    }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query<Review[], number>({
            query: (productId) => `/products/${productId}/reviews`,
            transformResponse: (response: any[]) => {
                return response.map(item => ({
                    id: item._id,
                    productId: item.productId,
                    author: item.userName,
                    rating: item.rating,
                    text: item.text,
                    date: item.createdAt
                }));
            },
            providesTags: (result, error, productId) =>
                result
                    ? [{ type: 'Reviews', id: productId }]
                    : ['Reviews'],
        }),

        addReview: builder.mutation<Review, NewReview>({
            query: (newReview) => ({
                url: '/reviews',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {
                    productId: newReview.productId,
                    userName: newReview.author,
                    rating: newReview.rating,
                    text: newReview.text
                }
            }),
            transformResponse: (response: any) => ({
                id: response._id,
                productId: response.productId,
                author: response.userName,
                rating: response.rating,
                text: response.text,
                date: response.createdAt
            }),
            invalidatesTags: (result, error, { productId }) => [
                { type: 'Reviews', id: productId }
            ],
        }),

        deleteReview: builder.mutation<{ message: string }, string>({
            query: (reviewId) => ({
                url: `/reviews/${reviewId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useGetReviewsQuery,
    useAddReviewMutation,
    useDeleteReviewMutation
} = reviewsApi;
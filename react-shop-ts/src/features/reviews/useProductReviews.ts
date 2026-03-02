import { useGetReviewsQuery, useAddReviewMutation } from '../../services/reviewsApi';
import type { NewReview } from '../../services/reviewsApi';

export const useProductReviews = (productId: number) => {
    const {
        data: reviews = [],
        isLoading,
        error,
        refetch
    } = useGetReviewsQuery(productId);

    const [addReview, { isLoading: isAdding }] = useAddReviewMutation();

    const handleAddReview = async (review: NewReview) => {
        try {
            await addReview(review).unwrap();
        } catch (err) {
            console.error('Ошибка при добавлении отзыва:', err);
            throw err;
        }
    };

    return {
        reviews,
        isLoading,
        isAdding,
        error,
        addReview: handleAddReview,
        refetch
    };
};
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addReview } from './reviewsSlice';
import styles from './ProductReviews.module.css';

type Props = { productId: number };

export const ProductReviews = ({ productId }: Props) => {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector((state) => 
    state.reviews.byProductId[productId] || []
  );
  
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
  });
   
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addReview({ productId, ...newReview }));
    setNewReview({ author: '', rating: 5, text: '' });
  };

  return (
    <section className={styles.reviewsSection}>
      <h3 className={styles.sectionTitle}>
        Отзывы {reviews.length > 0 && `(${reviews.length})`}
      </h3>

{/* Форма добавления отзыва */}
      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <h4 className={styles.formTitle}>Оставить отзыв</h4>
        
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Ваше имя:</label>
          <input
            value={newReview.author}
            onChange={(e) => setNewReview({...newReview, author: e.target.value})}
            className={styles.formInput}
            required
            maxLength={50}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Оценка:</label>
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({...newReview, rating: +e.target.value})}
            className={styles.formSelect}
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{n} ★</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Текст отзыва:</label>
          <textarea
            value={newReview.text}
            onChange={(e) => setNewReview({...newReview, text: e.target.value})}
            className={styles.formTextarea}
            rows={4}
            required
            minLength={10}
            maxLength={500}
          />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
        >
          Отправить
        </button>
      </form>

      {/* Список отзывов */}
      {reviews.length > 0 ? (
        <div className={styles.reviewsList}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div>
                  <p className={styles.reviewAuthor}>{review.author}</p>
                  <p className={styles.reviewDate}>
                    {new Date(review.date).toLocaleDateString('ru-RU')}
                  </p>
                </div>
                <div className={styles.reviewRating}>{review.rating} ★</div>
              </div>
              <p className={styles.reviewText}>{review.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noReviews}>Пока нет отзывов. Будьте первым!</p>
      )}
    </section>
  );
};
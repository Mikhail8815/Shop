import { useState } from 'react';
import { useProductReviews } from './useProductReviews';
import styles from './ProductReviews.module.css';

type Props = { productId: number };

export const ProductReviews = ({ productId }: Props) => {
  const [newReview, setNewReview] = useState({
    author: '',
    rating: 5,
    text: '',
  });

  const {
    reviews,
    isLoading,
    isAdding,
    error,
    addReview
  } = useProductReviews(productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await addReview({
        productId,
        ...newReview
      });
      setNewReview({ author: '', rating: 5, text: '' });
    } catch (err) {
      alert('Не удалось добавить отзыв. Попробуйте позже.');
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Загрузка отзывов...</div>;
  }

  if (error) {
    return <div className={styles.error}>Ошибка загрузки отзывов</div>;
  }

  return (
      <section className={styles.reviewsSection}>
        <h3 className={styles.sectionTitle}>
          Отзывы {reviews.length > 0 && `(${reviews.length})`}
        </h3>

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
                disabled={isAdding} // Блокируем форму во время отправки
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Оценка:</label>
            <select
                value={newReview.rating}
                onChange={(e) => setNewReview({...newReview, rating: +e.target.value})}
                className={styles.formSelect}
                disabled={isAdding}
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
                disabled={isAdding}
            />
          </div>

          <button
              type="submit"
              className={styles.submitButton}
              disabled={isAdding}
          >
            {isAdding ? 'Отправка...' : 'Отправить'}
          </button>
        </form>

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
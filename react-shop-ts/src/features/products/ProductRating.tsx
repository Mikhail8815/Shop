import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import type { Product } from '../products/types';
import styles from './ProductRating.module.css';

type Props = {
  rating: Product['rating'];
  showCount?: boolean;
};

export const ProductRating = ({ rating, showCount = true }: Props) => {
  if (!rating) return null;

  const fullStars = Math.floor(rating.rate);
  const hasHalfStar = rating.rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={styles.ratingContainer}>
      <div className={styles.stars}>
        {/* Полные звезды */}
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className={styles.star} />
        ))}
        
        {/* Половина звезды */}
        {hasHalfStar && (
          <div className={styles.halfStarContainer}>
            <StarOutlineIcon className={styles.starOutline} />
            <div className={styles.halfStarFill}>
              <StarIcon className={styles.star} />
            </div>
          </div>
        )}
        
        {/* Пустые звезды */}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOutlineIcon key={`empty-${i}`} className={styles.starOutline} />
        ))}
      </div>
      
      {showCount && (
        <span className={styles.ratingText}>
          {rating.rate.toFixed(1)} ({rating.count} оценок)
        </span>
      )}
    </div>
  );
};
import { FaShoppingCart } from 'react-icons/fa';
import { useAppSelector } from '../hooks';
import styles from './CartIcon.module.css'; 
import { useEffect, useState } from 'react';

export const CartIcon = () => {
  const itemsCount = useAppSelector(state => 
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

   const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (itemsCount > 0) {
      setIsBouncing(true);
      const timer = setTimeout(() => setIsBouncing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [itemsCount]);

  return (
    <div className="relative">
      <FaShoppingCart  className={`${styles.cartIcon} ${isBouncing ? styles.cartBounce : ''}`}/>
      {itemsCount > 0 && (
        <span className={styles.cartBadge}>
          {itemsCount}
        </span>
      )}
    </div>
  );
};
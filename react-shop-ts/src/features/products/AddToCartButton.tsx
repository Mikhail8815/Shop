import { useAppDispatch } from '../../hooks';
import { addToCart } from '../cart/cartSlice';
import type { Product } from './types';
import styles from './AddToCartButton.module.css';

type Props = { product: Product };

export const AddToCartButton = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  return (
    <button 
      onClick={() => dispatch(addToCart(product))}
      className={styles.button}
    >
      Добавить в корзину
    </button>
  );
};
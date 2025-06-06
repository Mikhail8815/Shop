import { useAppSelector, useAppDispatch } from '../../hooks';
import { removeFromCart, updateQuantity, clearCart } from './cartSlice';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const { items } = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.cartTitle}>Ваша корзина</h2>
      {items.map(item => (
        <div key={item.id} className={styles.cartItem}>
          <span>{item.title}</span>
          <div className="flex items-center">
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => 
                dispatch(updateQuantity({ 
                  id: item.id, 
                  quantity: Number(e.target.value) 
                }))
              }
              className={styles.quantityInput}
            />
            <button 
              onClick={() => dispatch(removeFromCart(item.id))}
              className={styles.removeButton}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      <div className={styles.total}>Total: ${total.toFixed(2)}</div>
      <button 
        onClick={() => dispatch(clearCart())}
        className={styles.clearButton}
      >
        Очистить корзину
      </button>
    </div>
  );
};
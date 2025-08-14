import {useAppSelector, useAppDispatch} from '../../hooks';
import {removeFromCart, updateQuantity, clearCart} from './cartSlice';
import styles from './CartPage.module.css';
import {useNavigate} from 'react-router-dom';

export const CartPage = () => {
    const {items} = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Ваша корзина</h2>
            {items.map(item => (
                <div key={item.id} className={styles.cartItem}>
                    <span>{item.title}</span>
                    <div className="flex items-center">
                        <input
                            type="number"
                            value={item.quantity}
                            min={'1'}
                            onChange={(e) => {
                                const value = Math.max(1, Number(e.target.value))
                                dispatch(updateQuantity({
                                    id: item.id,
                                    quantity: value
                                }))
                            }
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
            <div className={styles.total}>Итого: ${total.toFixed(2)}</div>
            <div className={styles.buttonsWrapper}>
                <button
                    onClick={() => dispatch(clearCart())}
                    className={styles.clearButton}
                >
                    Очистить корзину
                </button>
                <button
                    onClick={() => navigate('/checkout')}
                    disabled={items.length === 0}
                    className={styles.checkoutButton}
                >
                    Оформить заказ
                </button>
            </div>

        </div>
    );
};
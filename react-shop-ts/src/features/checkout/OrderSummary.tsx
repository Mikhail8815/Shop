
import styles from './OrderSummary.module.css';
import type {CartItem} from "../cart/cartSlice.ts";

type OrderSummaryProps = {
    items: CartItem[];
    total: number;
    onPlaceOrder: () => void;
};

export const OrderSummary = ({ items, total, onPlaceOrder }: OrderSummaryProps) => {
    return (
        <div className={styles.container}>
            <h2>Проверьте ваш заказ</h2>

            <div className={styles.itemsList}>
                {items.map(item => (
                    <div key={item.id} className={styles.item}>
                        <img
                            src={item.image}
                            alt={item.title}
                            className={styles.itemImage}
                        />
                        <div className={styles.itemDetails}>
                            <h3>{item.title}</h3>
                            <p>Количество: {item.quantity}</p>
                            <p>Цена: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.summary}>
                <div className={styles.summaryRow}>
                    <span>Товары:</span>
                    <span>${(total * 0.95).toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Доставка:</span>
                    <span>$5.00</span>
                </div>
                <div className={styles.summaryRowTotal}>
                    <span>Итого:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <button
                onClick={onPlaceOrder}
                className={styles.placeOrderButton}
            >
                Подтвердить заказ
            </button>
        </div>
    );
};
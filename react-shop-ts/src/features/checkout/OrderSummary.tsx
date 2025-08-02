
import styles from './OrderSummary.module.css';
import type {CartItem} from "../cart/cartSlice.ts";

type OrderSummaryProps = {
    items: CartItem[];
    total: number;
    subtotal: number;
    deliveryCost: number,
    onPlaceOrder: () => void;
};

const FREE_DELIVERY_THRESHOLD = 100

export const OrderSummary = ({ items, total, subtotal, deliveryCost, onPlaceOrder }: OrderSummaryProps) => {
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
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className={styles.summaryRow}>
                    <span>Доставка:</span>
                    <span> {deliveryCost === 0
                        ? `Бесплатно (заказ от $${FREE_DELIVERY_THRESHOLD})`
                        : `$${deliveryCost.toFixed(2)}`
                    }</span>
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
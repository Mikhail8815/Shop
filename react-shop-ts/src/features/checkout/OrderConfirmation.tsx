import { resetCheckout } from '../checkout/checkoutSlice';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import {clearCart} from "../cart/cartSlice.ts";
import styles from "./OrderConfirmation.module.css"
import { FaCheckCircle } from 'react-icons/fa';
import {useEffect, useState} from "react";

export const OrderConfirmation = () => {

    const [countdown, setCountdown] = useState(59);

    const { order } = useAppSelector(state => state.checkout);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleReturnToShop = () => {
        dispatch(resetCheckout());
        dispatch(clearCart());
        navigate('/');
    };

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleReturnToShop();
        }
    }, [countdown]);

    if (!order) {
        return (
            <div className={styles.confirmationError}>
                <h2>Ошибка заказа</h2>
                <p>Не удалось найти информацию о вашем заказе</p>
                <button onClick={handleReturnToShop}>Вернуться в магазин</button>
            </div>
        );
    }

    return (
        <div className={styles.orderConfirmation}>
            <FaCheckCircle size={64} color="#4CAF50"/>
            <h2>Спасибо за ваш заказ!</h2>
            <div className={styles.orderDetails}>
                <p><strong>Номер заказа:</strong> #{order.id}</p>
                <p><strong>Дата:</strong> {new Date(order.createdAt).toLocaleString()}</p>
                <p><strong>Способ оплаты:</strong> {
                    order.payment === 'card' ? 'Карта онлайн' :
                        order.payment === 'paypal' ? 'PayPal' : 'Наличные'
                }</p>
                <p><strong>Итого:</strong> ${order.total.toFixed(2)}</p>
            </div>

            <div className={styles.orderedItems}>
                <h3>Ваши товары:</h3>
                {order.items.map(item => (
                    <div key={item.id} className={styles.orderedItem}>
                        <img src={item.image} alt={item.title} width="50"/>
                        <span>{item.title} × {item.quantity}</span>
                    </div>
                ))}
            </div>

            <div className={styles.deliveryInfo}>
                <h3>Данные доставки</h3>
                <p>{order.delivery.firstName} {order.delivery.lastName}</p>
                <p>{order.delivery.address}, {order.delivery.city}</p>
                <p>Телефон: {order.delivery.phone}</p>
            </div>

            <button
                onClick={handleReturnToShop}
                className={styles.continueShoppingBtn}
            >
                Продолжить покупки
            </button>

            <p>Вы будете перенаправлены в магазин через {countdown} секунд...</p>
        </div>
    );
};
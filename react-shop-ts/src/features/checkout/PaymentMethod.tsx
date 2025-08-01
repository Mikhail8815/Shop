import {useState} from 'react';
import {setPaymentMethod} from './checkoutSlice';
import {useAppDispatch, useAppSelector} from "../../hooks.ts";
import type {PaymentMethod as PaymentMethodType} from './types';
import styles from './PaymentMethod.module.css';

export const PaymentMethod = () => {
    const dispatch = useAppDispatch();
    const {paymentMethod: currentPaymentMethod} = useAppSelector(state => state.checkout);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(currentPaymentMethod);

    const handleContinue = () => {
        if (selectedMethod) {
            dispatch(setPaymentMethod(selectedMethod));
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Выберите способ оплаты</h3>
            <div className={styles.methodsList}>
                <label  className={styles.methodLabel}>
                    <input
                        type="radio"
                        checked={selectedMethod === 'card'}
                        onChange={() => setSelectedMethod('card')}
                        className={styles.methodInput}
                    />
                    <span className={styles.methodText}>Картой онлайн</span>
                </label>
                <label className={styles.methodLabel}>
                    <input
                        type="radio"
                        checked={selectedMethod === 'cash'}
                        onChange={() => setSelectedMethod('cash')}
                        className={styles.methodInput}
                    />
                    <span className={styles.methodText}>Наличными при получении</span>
                </label>
                <label className={styles.methodLabel}>
                    <input
                        type="radio"
                        checked={selectedMethod === 'paypal'}
                        onChange={() => setSelectedMethod('paypal')}
                        className={styles.methodInput}
                    />
                    <span className={styles.methodText}>PayPal</span>
                </label>
            </div>
            <button
                onClick={handleContinue}
                disabled={!selectedMethod}
            >
                Продолжить
            </button>
        </div>
    );
};
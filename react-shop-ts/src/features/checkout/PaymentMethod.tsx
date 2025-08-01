import { useState } from 'react';
import { setPaymentMethod } from './checkoutSlice';
import { useAppDispatch, useAppSelector } from "../../hooks.ts";
import type { PaymentMethod as PaymentMethodType } from './types'; // Импортируем тип

export const PaymentMethod = () => {
    const dispatch = useAppDispatch();
    const { paymentMethod: currentPaymentMethod } = useAppSelector(state => state.checkout);
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType | null>(currentPaymentMethod);

    const handleContinue = () => {
        if (selectedMethod) {
            dispatch(setPaymentMethod(selectedMethod));
        }
    };

    return (
        <div>
            <h3>Выберите способ оплаты</h3>

            <label>
                <input
                    type="radio"
                    checked={selectedMethod === 'card'}
                    onChange={() => setSelectedMethod('card')}
                />
                Картой онлайн
            </label>

            <label>
                <input
                    type="radio"
                    checked={selectedMethod === 'cash'}
                    onChange={() => setSelectedMethod('cash')}
                />
                Наличными при получении
            </label>
            <label>
                <input
                    type="radio"
                    checked={selectedMethod === 'paypal'}
                    onChange={() => setSelectedMethod('paypal')}
                />
                PayPal
            </label>

            <button
                onClick={handleContinue}
                disabled={!selectedMethod}
            >
                Продолжить
            </button>
        </div>
    );
};
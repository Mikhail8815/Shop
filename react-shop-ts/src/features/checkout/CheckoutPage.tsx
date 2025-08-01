import {useAppDispatch, useAppSelector} from "../../hooks";
import { DeliveryForm } from "./DeliveryForm"
import { PaymentMethod } from "./PaymentMethod"
import {OrderSummary} from "./OrderSummary.tsx";
import {placeOrder} from "./checkoutSlice.ts";

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();

  const { step } = useAppSelector(state => state.checkout);
  const { items } = useAppSelector(state => state.cart);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    dispatch(placeOrder({ items, total }));
  };
  
  return (
    <div className="checkout-container">
      {step === 1 && <DeliveryForm />}
      {step === 2 && <PaymentMethod />}
      {step === 3 && (
          <OrderSummary
              items={items}
              total={total}
              onPlaceOrder={handlePlaceOrder}
          />
      )}
    </div>
  );
};
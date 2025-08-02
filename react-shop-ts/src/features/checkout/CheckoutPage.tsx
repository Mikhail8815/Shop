import {useAppDispatch, useAppSelector} from "../../hooks";
import { DeliveryForm } from "./DeliveryForm"
import { PaymentMethod } from "./PaymentMethod"
import {OrderSummary} from "./OrderSummary.tsx";
import {placeOrder, prevStep} from "./checkoutSlice.ts";
import {OrderConfirmation} from "./OrderConfirmation.tsx";
import {BackButton} from "../../components/BackButton.tsx";

type DeliveryRules = {
  freeThreshold: number;
  standardCost: number;
};

const DELIVERY_RULES: DeliveryRules = {
  freeThreshold: 100,
  standardCost: 5
};

export const CheckoutPage = () => {
  const dispatch = useAppDispatch();

  const { step } = useAppSelector(state => state.checkout);
  const { items } = useAppSelector(state => state.cart);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const deliveryCost = subtotal >= DELIVERY_RULES.freeThreshold
      ? 0
      : DELIVERY_RULES.standardCost;

  const total = subtotal + deliveryCost

  const handlePlaceOrder = () => {
    dispatch(placeOrder({ items, total, subtotal, deliveryCost }));
  };

  const handleGoBack = () => {
    if (step > 1) {
      dispatch(prevStep());
    }
  };
  
  return (
    <div className="checkout-container">
      {step > 1 && step < 4 && (
          <div className="absolute left-4 top-4 z-10">
            <BackButton
                onClick={handleGoBack}
                className="text-sm font-medium"
            />
          </div>
      )}
      {step === 1 && <DeliveryForm />}
      {step === 2 && <PaymentMethod />}
      {step === 3 && (
          <OrderSummary
              items={items}
              total={total}
              subtotal={subtotal}
              onPlaceOrder={handlePlaceOrder}
              deliveryCost={deliveryCost}
          />
      )}
      {step === 4 && <OrderConfirmation />}
    </div>
  );
};
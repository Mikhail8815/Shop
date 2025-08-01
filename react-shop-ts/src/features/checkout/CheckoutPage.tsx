import { useAppSelector } from "../../hooks";
import { DeliveryForm } from "./DeliveryForm"
import { PaymentMethod } from "./PaymentMethod"

export const CheckoutPage = () => {
  const { step } = useAppSelector(state => state.checkout);
  
  return (
    <div className="checkout-container">
      {step === 1 && <DeliveryForm />}
      {step === 2 && <PaymentMethod />}
    </div>
  );
};
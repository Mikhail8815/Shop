import { DeliveryForm } from "./DeliveryForm"
import { OrderSummary } from "./OrderSummary"
import { PaymentMethod } from "./PaymentMethod"

export const CheckoutPage = () => {
    let step: 1 | 2| 3 = 2
    return (
        <div>
            {step === 1 && <OrderSummary/>}
            {step === 2 && <DeliveryForm/>}
            {step === 3 && <PaymentMethod/>}
        </div>
    )
}
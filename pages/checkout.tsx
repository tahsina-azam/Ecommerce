import CheckoutHeader from "@/components/checkout/Header";
import OrderSummary from "@/components/checkout/OrderSummary";
import PaymentDetails from "@/components/checkout/PaymentDetails";
import { useCartItems } from "@/hooks/useCartStore";
import { useAuth, useCurrentUser } from "@/hooks/useCurrentUser";
import { useMemo } from "react";

function Checkout() {
  const cartItems = useCartItems();
  const user = useCurrentUser();
  const isAuthenticated = useAuth();

  console.log({ user });

  console.log({ cartItems });

  const priceTotal = useMemo(() => {
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map((item) => (totalPrice += item.quantity * item.price));
    }

    return totalPrice;
  }, [cartItems]);
  const taxes = useMemo(
    () => Number((priceTotal * 0.07).toFixed(2)),
    [priceTotal]
  );

  if (!isAuthenticated)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">Please login to continue</h1>
      </div>
    );

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-semibold">No items in cart</h1>
      </div>
    );

  return (
    <div>
      <CheckoutHeader />
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <OrderSummary cartItems={cartItems} />
        <PaymentDetails totalPrice={priceTotal + taxes} user={user} />
      </div>
    </div>
  );
}

export default Checkout;

import { useToggleCartModalClose } from "@/hooks/useCartModal";
import Link from "next/link";
import { useMemo } from "react";
import LottieAnimation from "../LottieAnimation";
import Price from "../Price";
import CartItem from "./CartItem";
import { useCartItems } from "@/hooks/useCartStore";

const ModalContent = () => {
  const cartItems = useCartItems();
  const toggleModalClose = useToggleCartModalClose(); // Hook to close the modal

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

  return (
    <section className="cart flex h-full flex-col justify-between overflow-hidden">
      <div>
        <div className="cart__intro">
          <h3 className="cart__title">Shopping Cart</h3>
        </div>

        <div className="">
          {cartItems.length > 0 && (
            <table>
              <thead className="w-full">
                <tr>
                  <th className="text-left">Product</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="w-full">
                {cartItems.map((item) => (
                  <CartItem
                    thumb={item.image}
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    count={item.quantity}
                  />
                ))}
              </tbody>
            </table>
          )}

          {!cartItems.length && (
            <LottieAnimation type="empty-cart" height={310} width={700} />
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="pt-2 text-lg text-black dark:text-white flex flex-col justify-end h-[50vh]">
            <div className="mb-2 flex items-center justify-between border-t border-gray-200">
              <p>Subtotal</p>
              <Price className="text-right" amount={priceTotal} />
            </div>
            <div className="mb-2 flex items-center justify-between">
              <p>Taxes</p>
              <Price className="text-right" amount={taxes} />
            </div>
            <div className="mb-2 flex items-center justify-between border-b border-gray-200 pb-2">
              <p>Shipping</p>
              <p className="text-right text-sm">calculated at checkout</p>
            </div>
            <div className="mb-2 flex items-center justify-between font-bold">
              <p>Total</p>
              <Price className="text-right" amount={priceTotal + taxes} />
            </div>
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center bg-black p-3 mb-2 text-sm font-medium uppercase text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black rounded-md"
            >
              <span>Proceed to Checkout</span>
            </Link>
          </div>
        )}
       <div className="flex flex-col justify-end h-full">
          <div className="flex-grow"></div> {/* Spacer to push the link to the bottom */}
          <button
            onClick={toggleModalClose} // Close the modal when clicked
            className="flex w-full items-center justify-center bg-black p-3 text-sm font-medium uppercase text-white opacity-90 hover:opacity-100 dark:bg-white dark:text-black rounded-md"
          >
            <span>Close Cart</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ModalContent;

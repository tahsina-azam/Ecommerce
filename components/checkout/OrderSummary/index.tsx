import { CartItem } from "global";
import ProductSummaryCard from "./ProductSummaryCard";
import ShippingMethod from "./ShippingMethod";

const OrderSummary = ({ cartItems }: { cartItems: CartItem[] }) => {
  return (
    <div className="px-4 pt-8">
      <p className="text-xl font-medium">Order Summary</p>
      <p className="text-gray-400">
        Check your items. And select a suitable shipping method.
      </p>

      <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
        {cartItems.map((item) => (
          <ProductSummaryCard
            name={item.name}
            thumb={item.image}
            price={item.price}
            count={item.quantity}
            key={item.id}
          />
        ))}
      </div>

      <ShippingMethod />
    </div>
  );
};

export default OrderSummary;

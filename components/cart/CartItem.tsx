import {
  useAddToCart,
  useRemove1FromCart,
  useRemoveFromCart,
} from "@/hooks/useCartStore";
import { ProductStoreType } from "@/utils/types";
import { TAKA } from "../products/product-item";

const CartItem = ({
  name,
  id,
  thumb,
  count,
  price,
}: Pick<ProductStoreType, "name" | "id" | "thumb" | "count" | "price">) => {
  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();
  const deleteFromCart = useRemove1FromCart();

  return (
    <tr className="my-8">
      <td className="">
        <div className="cart-product">
          <div className="cart-product__img">
            <img src={thumb} alt="" />
          </div>

          <div className="cart-product__content w-full">
            <h3>{name}</h3>
            <p>#{id}</p>
          </div>
        </div>
      </td>

      <td className="mx-12 px-12">
        <div className="quantity-button w-full">
          <button
            type="button"
            onClick={() => deleteFromCart(id)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={() =>
              addToCart({ id, name, price, image: thumb, quantity: 1 })
            }
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>
        {TAKA}
        {price}
      </td>
      <td className="cart-item-cancel pl-12">
        <i
          className="icon-cancel cursor-pointer"
          onClick={() => removeFromCart(id)}
        ></i>
      </td>
    </tr>
  );
};

export default CartItem;

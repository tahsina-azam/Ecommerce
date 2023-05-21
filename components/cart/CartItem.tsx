import { ProductStoreType } from "@/utils/types";

const CartItem = ({
  name,
  id,
  thumb,
  count,
  price,
}: Pick<ProductStoreType, "name" | "id" | "thumb" | "count" | "price">) => {
  const removeFromCart = () => {};

  const setProductCount = (count: number) => {
    if (count <= 0) {
      return;
    }

    const payload = {
      product: {
        name,
        id,
        count,
        price,
      },
      count,
    };
  };

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
            onClick={() => setProductCount(count - 1)}
            className="quantity-button__btn"
          >
            -
          </button>
          <span>{count}</span>
          <button
            type="button"
            onClick={() => setProductCount(count + 1)}
            className="quantity-button__btn"
          >
            +
          </button>
        </div>
      </td>
      <td>${price}</td>
      <td className="cart-item-cancel pl-12">
        <i className="icon-cancel" onClick={() => removeFromCart()}></i>
      </td>
    </tr>
  );
};

export default CartItem;

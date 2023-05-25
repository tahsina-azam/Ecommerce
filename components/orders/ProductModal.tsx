import { ProductType } from "@/global";
import { Drawer } from "@mantine/core";
import CartItem from "../cart/CartItem";

type ProductModalType = {
  products: ProductType[];
  opened: boolean;
  close: () => void;
};
const ProductModal = ({ products, opened, close }: ProductModalType) => {
  return (
    <Drawer
      opened={opened}
      onClose={close}
      position="right"
      className="absolute z-[10000]"
      size="lg"
      withCloseButton={false}
      transitionProps={{
        transition: "rotate-left",
        duration: 150,
        timingFunction: "linear",
      }}
    >
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
          {products.map((item) => (
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
    </Drawer>
  );
};

export default ProductModal;

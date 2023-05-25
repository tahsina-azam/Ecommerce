import { ComponentPropsWithoutRef } from "react";
import { TAKA } from "./products/product-item";

const Price = ({
  amount,
}: ComponentPropsWithoutRef<"div"> & {
  amount: number;
}) => {
  return (
    <div>
      {TAKA} {amount}
    </div>
  );
};

export default Price;

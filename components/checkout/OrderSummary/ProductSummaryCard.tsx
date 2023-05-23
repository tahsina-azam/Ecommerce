import { TAKA } from "@/components/products/product-item";

type Props = {
  name: string;
  price: number;
  thumb: string;
  count: number;
};

const ProductSummaryCard = ({ name, price, thumb, count }: Props) => {
  return (
    <div className="flex flex-col rounded-lg bg-white sm:flex-row">
      <img
        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
        src={thumb}
        alt=""
      />
      <div className="flex w-full flex-col px-4 py-4">
        <span className="font-semibold">{name}</span>
        <span className="float-right text-gray-400">X{count}</span>
        <p className="text-lg font-bold">
          {TAKA}
          {price}
        </p>
      </div>
    </div>
  );
};

export default ProductSummaryCard;

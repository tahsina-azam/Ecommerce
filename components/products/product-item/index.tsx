/* eslint-disable @next/next/no-img-element */
import { useAddToCart } from "@/hooks/useCartStore";
import { ProductTypeList } from "@/utils/types";
import Link from "next/link";
import { useRouter } from "next/router";

export const TAKA = "৳";
const ProductItem = ({
  discount,
  images,
  id,
  name,
  price,
  currentPrice,
}: ProductTypeList) => {
  const addToCart = useAddToCart();
  const router = useRouter();

  const shouldShowAddToCart = !router.pathname.includes("retailer");
  return (
    <div className="product-item">
      <div className="product__image">
        <Link href={`/product/${id}`}>
          <img
            src={images ? images[0] : ""}
            alt="product"
            className="rounded-lg"
          />
          {discount && <span className="product__discount">{discount}%</span>}
        </Link>
      </div>

      <div className="flex flex-wrap">
        <h1 className="flex-auto text-lg font-semibold text-slate-900">
          {name}
        </h1>
        <div className="text-lg font-semibold text-slate-500">
          {`${TAKA} ${currentPrice}`}
        </div>
      </div>
      {shouldShowAddToCart && (
        <div className="flex space-x-4 mt-2 mb-6 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            <button
              className="h-8 px-4 font-semibold rounded-md bg-black text-white"
              type="button"
              onClick={() =>
                addToCart({
                  price: currentPrice as number,
                  id,
                  name,
                  image: images[0] as string,
                  quantity: 1,
                })
              }
            >
              Add to cart
            </button>
          </div>
          <button
            className="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
            type="button"
            aria-label="Like"
          >
            <svg width="20" height="20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductItem;

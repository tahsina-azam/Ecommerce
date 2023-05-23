import { ProductTypeList } from "@/utils/types";
import { useRouter } from "next/router";
import useSwr from "swr";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

const fetcher = (url: string[]) => {
  const data = fetch(url[0]).then((res) => res.json());
  if (url[1]) {
    return data.then((res) =>
      res.filter((item: ProductTypeList) => item.type === url[1])
    );
  }

  return data;
};
const ProductsContent = () => {
  const router = useRouter();
  const filter = router.query.filter as string;

  const { data, error } = useSwr(["/api/products", filter], fetcher, {
    revalidateIfStale: false,
  });

  if (error) return <div>Failed to load users</div>;
  return (
    <>
      {!data && <ProductsLoading />}

      {data && (
        <section className="products-list">
          {data.map((item: ProductTypeList) => (
            <ProductItem
              type={item.type}
              id={item.id}
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;

import { useProduct } from "@/hooks/useProduct";
import { ProductTypeList } from "@/utils/types";
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

const ProductsContent = () => {
  const { data, error } = useProduct();

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

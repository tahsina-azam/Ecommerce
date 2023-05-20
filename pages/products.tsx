import Layout from "@/components/Layout";
import Breadcrumb from "@/components/breadcrumb";
import ProductsContent from "@/components/products/products-content";
import ProductsFilter from "@/components/products/products-filter";

const Products = () => (
  <Layout>
    <Breadcrumb />
    <section className="products-page">
      <div className="container">
        <ProductsFilter />
        <ProductsContent />
      </div>
    </section>
  </Layout>
);

export default Products;

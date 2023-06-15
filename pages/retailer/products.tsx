import RetailerLayout from "@/components/Layout/retailer";
import { DashboardHeader } from "@/components/header";
import ProductsContent from "@/components/products/products-content";
import { DashboardShell } from "@/components/shell";

const Products = () => {
  return (
    <RetailerLayout>
      <DashboardShell>
        <DashboardHeader heading="Products" text="Show all of your products" />
        <ProductsContent />
      </DashboardShell>
    </RetailerLayout>
  );
};

export default Products;

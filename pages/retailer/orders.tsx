import RetailerLayout from "@/components/Layout/retailer";
import { DashboardHeader } from "@/components/header";
import OrderTable from "@/components/orders";
import { DashboardShell } from "@/components/shell";
import { useOrder } from "@/hooks/useOrder";

const Orders = () => {
  const { data, isLoading } = useOrder({
    status: "confirmed",
  });

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>No data</h1>;
  return (
    <RetailerLayout>
      <DashboardShell>
        <DashboardHeader heading="Retailer Orders" text="Manage orders" />
        <div className="w-full">
          <OrderTable data={data} />
        </div>
      </DashboardShell>
    </RetailerLayout>
  );
};

export default Orders;

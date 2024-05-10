import RetailerLayout from "@/components/Layout/retailer";
import { DashboardHeader } from "@/components/header";
import OrderTable from "@/components/orders";
import { DashboardShell } from "@/components/shell";
import { OrderData } from "@/global";
import { useOrder } from "@/hooks/useOrder";

const Orders = () => {
  const { data, isLoading } = useOrder({
    status: "confirmed",
  });

  return (
    <RetailerLayout>
      <DashboardShell>
        <DashboardHeader heading="Retailer Orders" text="Manage orders" />
        <div style={{overflowX:"auto"}
        } >
          <OrderTable
            data={data ?? ([] as OrderData[])}
            isLoading={isLoading}
          />
        </div>
      </DashboardShell>
    </RetailerLayout>
  );
};

export default Orders;

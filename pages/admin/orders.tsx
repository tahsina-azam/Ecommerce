import AdminLayout from "@/components/Layout/admin";
import { DashboardHeader } from "@/components/header";
import OrderTable from "@/components/orders";
import { DashboardShell } from "@/components/shell";
import { OrderData } from "@/global";
import { useOrder } from "@/hooks/useOrder";

const Orders = () => {
  const { data, isLoading } = useOrder({});

  return (
    <AdminLayout>
      <DashboardShell>
        <DashboardHeader heading="Orders" text="Manage orders" />
        <OrderTable data={data as OrderData[]} isLoading={isLoading} />
      </DashboardShell>
    </AdminLayout>
  );
};

export default Orders;

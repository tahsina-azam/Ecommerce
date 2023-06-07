import AdminLayout from "@/components/Layout/admin";
import OrderTable from "@/components/orders";
import { useOrder } from "@/hooks/useOrder";

type TabValue = "orders" | "users" | "transactions" | null;

const Orders = () => {
  const { data, isLoading } = useOrder({});

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>No data</h1>;
  return (
    <AdminLayout>
      <div className="container font-sans mt-16">
        <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
        <div className="w-full py-6">
          <OrderTable data={data} />
        </div>
      </div>
    </AdminLayout>
  );
};

export default Orders;

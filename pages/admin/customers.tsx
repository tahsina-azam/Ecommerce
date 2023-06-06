import AdminLayout from "@/components/Layout/admin";
import OrderTable from "@/components/orders";
import { useOrder } from "@/hooks/useOrder";
import { Tabs } from "@mantine/core";
import { useState } from "react";

type TabValue = "orders" | "users" | "transactions" | null;

const Customers = () => {
  const { data, isLoading } = useOrder({});
  const [activeTab, setActiveTab] = useState<TabValue>("orders");

  if (isLoading) return <h1>Loading...</h1>;

  if (!data) return <h1>No data</h1>;
  return (
    <AdminLayout>
      <div className="container font-sans mt-16">
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <div className="w-full py-6">
          <Tabs
            value={activeTab}
            onTabChange={(value: TabValue) => setActiveTab(value)}
          >
            <Tabs.List position="apart" grow className="mb-6">
              <Tabs.Tab value="orders">Orders</Tabs.Tab>
              <Tabs.Tab value="users">Users</Tabs.Tab>
              <Tabs.Tab value="transactions">Transactions</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="orders">
              {" "}
              <OrderTable data={data} />
            </Tabs.Panel>
            <Tabs.Panel value="users">Second panel</Tabs.Panel>
            <Tabs.Panel value="transactions">Second panel</Tabs.Panel>
          </Tabs>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Customers;

import DashboardLayout from "@/components/Layout/user";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import UserOrderTable from "@/components/users/UserOrderTable";
import useOrdersOfSpecificUser from "@/hooks/useOrdersOfSpecificUser";
import { Order } from "@prisma/client";

const AllOrders = () => {
  const { data, isLoading } = useOrdersOfSpecificUser();

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <DashboardLayout role="user">
      <DashboardShell>
        <DashboardHeader
          heading="All Orders"
          text="Manage all of your orders"
        />
        <UserOrderTable data={data as Order[]} />
      </DashboardShell>
    </DashboardLayout>
  );
};

export default AllOrders;

import DashboardLayout from "@/components/Layout/user";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import UserOrderTable from "@/components/users/UserOrderTable";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useOrdersOfSpecificUser from "@/hooks/useOrdersOfSpecificUser";
import { Order } from "@prisma/client";
import { useRouter } from "next/router";

const AllOrders = () => {
  const { data, isLoading } = useOrdersOfSpecificUser();

  const router = useRouter();

  const { role } = useCurrentUser();

  const isLoggedIn = !!role;

  if (!isLoggedIn) {
    router.push("/sign-in");
  }

  if (role !== "user") {
    if (role === "supplier") router.push("/retailer/orders");
    else router.push("/admin/orders");
  }

  return (
    <DashboardLayout role="user">
      <DashboardShell>
        <DashboardHeader
          heading="All Orders"
          text="Manage all of your orders"
        />
        <UserOrderTable data={data as Order[]} isLoading={isLoading} />
      </DashboardShell>
    </DashboardLayout>
  );
};

export default AllOrders;

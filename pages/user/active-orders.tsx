import DashboardLayout from "@/components/Layout/user";
import OrderStepper from "@/components/Stepper";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Skeleton } from "@/components/skeleton";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import useOrdersOfSpecificUser from "@/hooks/useOrdersOfSpecificUser";
import { useRouter } from "next/router";

const ActiveOrders = () => {
  const { data, isLoading } = useOrdersOfSpecificUser();
  const router = useRouter();

  const { role } = useCurrentUser();
  const isLoggedIn = !!role;

  if (!isLoggedIn) {
    router.push("/sign-in");
  }

  if (role !== "user") {
    if (role === "supplier") router.push("/retailer/orders");
    else if (role == "admin") router.push("/admin/bank-information");
    else router.push("/sign-in");
  }

  const activeOrders =
    data?.filter((order) => order.status !== "delivered").slice(0, 5) ?? [];

  return (
    <DashboardLayout role="user">
      <DashboardShell>
        <DashboardHeader
          heading=" All Active Orders"
          text="See all of your active orders"
        />

        {isLoading ? (
          <>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-28 py-8" />
              ))}
          </>
        ) : (
          activeOrders.map((order) => (
            <OrderStepper
              key={order.orderId}
              orderDate={order.createdAt}
              orderId={order.orderId}
              status={order.status}
            />
          ))
        )}
      </DashboardShell>
    </DashboardLayout>
  );
};

export default ActiveOrders;

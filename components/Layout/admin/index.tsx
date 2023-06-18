import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import DashboardLayout from "../user";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const { role } = useCurrentUser();
  const router = useRouter();

  const isLoggedIn = !!role;

  if (!isLoggedIn) router.push("/sign-in");

  if (role !== "admin") {
    if (role === "supplier") router.push("/retailer/orders");
    else router.push("/products");
  }

  return <DashboardLayout role="admin">{children}</DashboardLayout>;
};

export default AdminLayout;

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
    if (role === "supplier") {
      router.push("/retailer/orders");
    } else if (role == "user") {
      router.push("/products");
    } else {
      router.push("/sign-in");
    }
  }

  return <DashboardLayout role="admin">{children}</DashboardLayout>;
};

export default AdminLayout;

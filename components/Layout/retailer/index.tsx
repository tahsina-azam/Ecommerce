import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import DashboardLayout from "../user";

const RetailerLayout = ({ children }: PropsWithChildren) => {
  const { role } = useCurrentUser();
  const router = useRouter();
  const isLoggedIn = !!role;

  if (!isLoggedIn) router.push("/sign-in");

  if (role !== "supplier") {
    if (role === "admin") router.push("/admin/dashboard");
    else router.push("/products");
  }
  return <DashboardLayout role="supplier">{children}</DashboardLayout>;
};

export default RetailerLayout;

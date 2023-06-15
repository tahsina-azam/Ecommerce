import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PropsWithChildren } from "react";
import DashboardLayout from "../user";

const RetailerLayout = ({ children }: PropsWithChildren) => {
  const { role } = useCurrentUser();
  return <DashboardLayout role="supplier">{children}</DashboardLayout>;
};

export default RetailerLayout;

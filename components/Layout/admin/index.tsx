import { useCurrentUser } from "@/hooks/useCurrentUser";
import { PropsWithChildren } from "react";
import DashboardLayout from "../user";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const { role } = useCurrentUser();

  console.log({ role });
  return <DashboardLayout role="admin">{children}</DashboardLayout>;
};

export default AdminLayout;

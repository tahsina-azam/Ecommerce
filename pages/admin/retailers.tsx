import AdminLayout from "@/components/Layout/admin";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import UserTable from "@/components/users/UserTable";
import { useUsers } from "@/hooks/useUsers";

const Retailers = () => {
  const { data, isLoading } = useUsers();

  const retailers = data?.filter((user) => user.role === "supplier") ?? [];

  return (
    <AdminLayout>
      <DashboardShell>
        <DashboardHeader heading="Retailers" text="Manage retailers" />
        <UserTable data={retailers} isLoading={isLoading} />
      </DashboardShell>
    </AdminLayout>
  );
};

export default Retailers;

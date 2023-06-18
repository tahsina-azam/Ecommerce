import DashboardLayout from "@/components/Layout/user";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import { useBank } from "@/hooks/useBank";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/router";

const BankInformation = () => {
  const { data, isLoading } = useBank();
  const { name, email, role } = useCurrentUser();
  const router = useRouter();

  const isLoggedIn = !!role;

  if (!isLoggedIn) {
    router.push("/sign-in");
  }

  if (role !== "user") {
    if (role === "supplier") router.push("/retailer/bank-information");
    else if (role == "admin") router.push("/admin/bank-information");
    else router.push("/sign-in");
  }

  return (
    <DashboardLayout role="user">
      <DashboardShell>
        <DashboardHeader heading="Bank Information" text="Manage account" />
        <div className="grid gap-10">
          <UserNameForm
            name={name}
            email={email}
            deposit={data?.deposit as number}
            accountId={data?.accountId as string}
            isLoading={isLoading}
          />
        </div>
      </DashboardShell>
    </DashboardLayout>
  );
};

export default BankInformation;

import DashboardLayout from "@/components/Layout/user";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserNameForm } from "@/components/user-name-form";
import { useBank } from "@/hooks/useBank";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const BankInformation = () => {
  const { data, isLoading } = useBank();
  const { name, email } = useCurrentUser();

  return (
    <DashboardLayout role="user">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <DashboardShell>
          <DashboardHeader heading="Bank Information" text="Manage account" />
          <div className="grid gap-10">
            <UserNameForm
              name={name}
              email={email}
              deposit={data?.deposit as number}
              accountId={data?.accountId as string}
            />
          </div>
        </DashboardShell>
      )}
    </DashboardLayout>
  );
};

export default BankInformation;

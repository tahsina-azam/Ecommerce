import { DashboardNav } from "@/components/nav";
import { UserAccountNav } from "@/components/user-account-nav";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { MainNav } from "./MainNav";

export const dashboardConfig = {
  mainNav: [],
  sidebarNav: {
    admin: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: "post",
      },
      {
        title: "Orders",
        href: "/admin/orders",
        icon: "post",
      },
      {
        title: "Customers",
        href: "/admin/customers",
        icon: "billing",
      },
      {
        title: "Retailers",
        href: "/admin/retailers",
        icon: "billing",
      },
      {
        title: "Bank Information",
        href: "/admin/bank-information",
        icon: "settings",
      },
    ],
    user: [
      {
        title: "Active Orders",
        href: "/user/active-orders",
        icon: "post",
      },
      {
        title: "All Orders",
        href: "/user/all-orders",
        icon: "billing",
      },
      {
        title: "Bank Information",
        href: "/user/bank-information",
        icon: "settings",
      },
    ],
    supplier: [
      {
        title: "Orders",
        href: "/retailer/orders",
        icon: "post",
      },
      {
        title: "Products",
        href: "/retailer/products",
        icon: "post",
      },
      {
        title: "Bank Information",
        href: "/retailer/bank-information",
        icon: "settings",
      },
    ],
  },
};
interface DashboardLayoutProps {
  children?: React.ReactNode;
  role: string;
}

export default function DashboardLayout({
  children,
  role = "user",
}: DashboardLayoutProps) {
  const { name, email } = useCurrentUser();

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav />
          <UserAccountNav
            user={{
              name: name,
              image: "",
              email: email,
            }}
          />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          {/* @ts-ignore */}
          <DashboardNav items={dashboardConfig.sidebarNav[role]} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {name && children}
        </main>
      </div>
    </div>
  );
}

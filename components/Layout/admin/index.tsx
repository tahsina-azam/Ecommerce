import { PropsWithChildren } from "react";
import { MainNav } from "./MainNav";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 container">
            <h2 className="text-3xl font-bold tracking-tight">Admin Panel</h2>
            <div className="ml-auto flex items-center space-x-4">
              <MainNav className="mx-6" />
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminLayout;

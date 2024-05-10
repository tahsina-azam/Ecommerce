import Link from "next/link";
import * as React from "react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import { useCurrentUser } from "@/hooks/useCurrentUser"; // Import the useCurrentUser hook

interface MainNavProps {
  // No need to pass userRole as prop
}

export function MainNav({}: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const router = useRouter();
  const currentUser = useCurrentUser(); // Get current user using useCurrentUser hook

  const dropdownItems = getDropdownItemsForRole(currentUser.role); // Determine dropdown items based on user's role

  const handleItemClick = (route: Url) => {
    router.push(route);
    setShowMobileMenu(false); // Close the mobile menu after navigation
  };

  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/products" className="hidden items-center space-x-2 md:flex">
        <Image
          src="/images/abstract-shape.png"
          width={24}
          height={204}
          alt="Picture of the author"
        />
        <span className="hidden font-bold sm:inline-block">Shoppers</span>
      </Link>

      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.logo /> : <Icons.close />}
        <span className="font-bold">Menu</span>
      </button>

      {!showMobileMenu && (
        <div className="absolute top-full left-18 z-10 bg-white shadow-md rounded-md md:hidden">
          {dropdownItems.map((item) => (
            <button
              key={item.id}
              className="block w-full py-2 px-4 text-left hover:bg-gray-100"
              onClick={() => handleItemClick(item.route)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Function to get dropdown items based on user role
const getDropdownItemsForRole = (role: string) => {
  let dropdownItems: { id: number; title: string; route: string; }[] = [];

  switch (role) {
    case "user":
      dropdownItems = [
        { id: 1, title: "Active Orders", route: "/user/active-orders" },
        { id: 2, title: "All Orders", route: "/user/all-orders" },
        { id: 3, title: "Bank Information", route: "/user/bank-information" },
        { id: 4, title: "Products Page", route: "/products" }
      ];
      break;
    case "admin":
      dropdownItems = [
        { id: 1, title: "Dashboard", route: "/admin/dashboard" },
        { id: 2, title: "Orders", route: "/admin/orders" },
        { id: 3, title: "Customers", route: "/admin/customers" },
        { id: 4, title: "Retailers", route: "/admin/retailers" },
        { id: 5, title: "Bank Information", route: "/admin/bank-information" }
      ];
      break;
    case "supplier":
      dropdownItems = [
        { id: 1, title: "Orders", route: "/retailer/orders" },
        { id: 2, title: "Products", route: "/retailer/products" },
        { id: 3, title: "Bank Information", route: "/retailer/bank-information" },
      ];
      break;
    default:
      // Default dropdown items for unknown roles
      dropdownItems = [];
  }

  return dropdownItems;
};

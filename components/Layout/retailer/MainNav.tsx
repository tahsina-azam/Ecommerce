import { cn } from "@/lib/utils";
import { clsx } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  return (
    <nav
      className={clsx("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/retailer/orders"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          router.pathname === "/retailer/orders" && "text-primary underline"
        )}
      >
        Orders
      </Link>
      <Link
        href="/retailer/products"
        className={cn(
          "text-sm font-medium text-muted-foreground transition-colors hover:text-primary",
          router.pathname === "/retailer/products" && "text-primary underline"
        )}
      >
        Products
      </Link>
    </nav>
  );
}

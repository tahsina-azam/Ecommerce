import { Avatar, AvatarFallback } from "@/components/avatar";
import { useRecentOrder } from "@/hooks/useRecentSales";
import { useMemo } from "react";
import { TAKA } from "./products/product-item";
import { Skeleton } from "./skeleton";

export function RecentSales() {
  const { data, isLoading } = useRecentOrder();

  const recentOrders = useMemo(() => {
    if (!data) return [];
    return data.map((dt) => (
      <div className="flex flex-col sm:flex-row items-center sm:items-start" key={dt.id}>
        <Avatar className="h-9 w-9">
          <AvatarFallback>{dt.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className="mt-2 sm:mt-0 sm:ml-auto space-y-1">
          <p className="text-sm font-medium leading-none">{dt.name}</p>
          <p className="text-sm text-muted-foreground">{dt.email}</p>
        </div>
        <div className="mt-2 sm:mt-0 sm:ml-auto font-medium">
          +{TAKA}{dt.amount}
        </div>
      </div>
    ));
  }, [data]);

  if (isLoading)
    return (
      <div className="space-y-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="flex flex-col sm:flex-row items-center sm:items-start" key={i}>
            <Skeleton className="h-9 w-9 rounded-full"></Skeleton>
            <Skeleton className="mt-2 sm:mt-0 sm:ml-4 space-y-1 w-full h-10"></Skeleton>
            <Skeleton className="mt-2 sm:mt-0 sm:ml-auto font-medium"></Skeleton>
          </div>
        ))}
      </div>
    );

  return <div className="space-y-8">{recentOrders}</div>;
}

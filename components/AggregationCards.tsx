import { useAggregate } from "@/hooks/useAggregates";
import { AggregateResponseData } from "@/pages/api/orders/aggregate";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { TAKA } from "./products/product-item";
import { Skeleton } from "./skeleton";
const Icons = [DollarSign, Users, CreditCard, Activity];
const AggregationCards = () => {
  const { data, isLoading } = useAggregate();

  const items = useMemo(() => {
    if (!data) return [];
    return Object.keys(data).map((key, index) => {
      const Icon = Icons[index];
      return (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{key}</CardTitle>
            {![0, 4].includes(index) ? (
              <Icon className="h-4 w-4 text-muted-foreground" />
            ) : (
              <span className="h-4 w-4 text-muted-foreground">{TAKA}</span>
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data[key as keyof AggregateResponseData]}
            </div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      );
    });
  }, [data]);
  if (isLoading)
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, i) => i + 1).map((id) => (
          <Card key={id}>
            <Skeleton className="flex flex-row items-center justify-between space-y-0 pb-2 h-10"></Skeleton>
            <Skeleton className="h-24 mt-1"></Skeleton>
          </Card>
        ))}
      </div>
    );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">{items}</div>
  );
};

export default AggregationCards;

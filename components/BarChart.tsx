import { useOrder } from "@/hooks/useOrder";
import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { TAKA } from "./products/product-item";
import { Skeleton } from "./skeleton";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
];

export function Overview() {
  const { data, isLoading } = useOrder({});

  const formattedData = useMemo(() => {
    if (!data) return [];
    const formatted = data.map((dt) => {
      const isoString = dt.createdAt;
      const date = new Date(isoString);
      const month = date.toLocaleString("default", { month: "short" });

      return {
        name: month,
        amount: dt.amount,
      };
    });

    return formatted.reduce((acc, cur) => {
      const index = acc.findIndex((dt) => dt.name === cur.name);
      if (index !== -1) {
        acc[index].amount += cur.amount;
        return acc;
      }

      return [...acc, cur];
    }, [] as { name: string; amount: number }[]);
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={350}>
      {isLoading ? (
        <Skeleton className="w-[483px] h-[350px]" />
      ) : (
        <BarChart data={formattedData}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />

          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${TAKA}${value}`}
          />
          <Bar dataKey="amount" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
}

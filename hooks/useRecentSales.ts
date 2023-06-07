import { OrderData } from "@/global";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

type FormattedOrder = {
  id: string;
  email: string;
  name: string;
  amount: number;
  createdAt: Date;
};
const fetcher = async (url: string): Promise<FormattedOrder[]> => {
  const res = await axios.get(url);
  const formatted = res.data.orders.map((order: OrderData) => {
    return {
      id: order.orderId,
      email: order.user.email,
      name: order.user.name,
      amount: order.amount,
      createdAt: new Date(order.createdAt),
    };
  });
  return formatted;
};

export const useRecentOrder = () => {
  const { data, isLoading, error } = useQuery<FormattedOrder[]>({
    queryKey: ["orders", "recent"],
    queryFn: () => fetcher("orders/recent-sales"),
  });

  return {
    data,
    isLoading,
    error,
  };
};

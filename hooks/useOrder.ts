import { OrderData } from "@/global";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetcher = async (
  url: string,
  status: string | undefined
): Promise<OrderData[]> => {
  if (status) {
    const res = await axios.get(url, { params: { status } });
    return res.data.orders;
  }
  const res_1 = await axios.get(url);
  return res_1.data.orders;
};

export const useOrder = ({ status }: { status?: string }) => {
  const { data, isLoading, error } = useQuery<OrderData[]>({
    queryKey: ["orders", { status }],
    queryFn: () => fetcher("orders", status),
  });
  return {
    data,
    isLoading,
    error,
  };
};

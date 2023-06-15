import { axios } from "@/lib/axios";
import { Order } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./useCurrentUser";

const fetcher = async (
  url: string,
  userId: string | undefined
): Promise<Order[]> => {
  const res = await axios.get(url, { params: { userId } });
  return res.data.orders;
};
const useOrdersOfSpecificUser = () => {
  const { userId } = useCurrentUser();
  const { data, isLoading, error } = useQuery<Order[]>({
    queryKey: ["orders", userId],
    enabled: !!userId,
    queryFn: () => fetcher("users/orders", userId),
  });
  return {
    data,
    isLoading,
    error,
  };
};

export default useOrdersOfSpecificUser;

import { axios } from "@/lib/axios";
import { Bank } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "./useCurrentUser";

const fetcher = async (url: string, accountId: string): Promise<Bank> => {
  const res = await axios.get(url, { params: { accountId } });

  console.log({ res, accountId });
  return res.data.bank;
};

export const useBank = () => {
  const { userId } = useCurrentUser();
  console.log({ userId });
  const { data, isLoading, error } = useQuery<Bank>({
    queryKey: ["bank", userId],
    enabled: !!userId,
    queryFn: () => fetcher("bank", userId),
  });
  return {
    data,
    isLoading,
    error,
  };
};

import { User } from "@/global";
import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetcher = async (url: string): Promise<User[]> => {
  const res = await axios.get(url);
  return res.data.users;
};

export const useUsers = () => {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => fetcher("users"),
  });
  return {
    data,
    isLoading,
    error,
  };
};

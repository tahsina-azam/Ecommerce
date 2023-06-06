import { axios } from "@/lib/axios";
import { AggregateResponseData } from "@/pages/api/orders/aggregate";
import { useQuery } from "@tanstack/react-query";

const fetcher = async (url: string): Promise<AggregateResponseData> => {
  const res = await axios.get(url);

  const data = await res.data;

  return data;
};

export const useAggregate = () => {
  const { data, isLoading, error } = useQuery<AggregateResponseData>({
    queryKey: ["aggregate"],
    queryFn: () => fetcher("/orders/aggregate"),
  });

  return { data, isLoading, error };
};

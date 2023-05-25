import { axios } from "@/lib/axios";
import { ProductTypeList } from "@/utils/types";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const fetcher = async (url: string[]): Promise<ProductTypeList[]> => {
  const [key, filter] = url;
  const res = await axios.get(key);

  const data = await res.data;
  if (filter) {
    return data.filter((item: ProductTypeList) => item.type === url[1]);
  }
  console.log({ data });

  return data;
};

export const useProduct = () => {
  const router = useRouter();
  const filter = router.query.filter as string;
  const { data, isLoading, error } = useQuery<ProductTypeList[]>({
    queryKey: ["products", { filter }],
    queryFn: () => fetcher(["products", filter]),
    staleTime: Infinity,
  });

  return { data, isLoading, error };
};

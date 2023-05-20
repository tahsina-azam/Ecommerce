import { axios } from "@/lib/axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req);
  const response = await axios.get("https://fakestoreapi.com/products");
  const products = response.data;
  console.log(products);

  // fake loading time
  setTimeout(() => {
    return res.status(200).json(products);
  }, 800);
}

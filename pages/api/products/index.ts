import products from "@/utils/data/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // fake loading time
  setTimeout(() => {
    return res.status(200).json(products);
  }, 800);
}

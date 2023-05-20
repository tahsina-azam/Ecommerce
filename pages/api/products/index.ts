import products from "@/utils/data/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req);

  // fake loading time
  setTimeout(() => {
    res.status(200).json(products);
  }, 800);
}

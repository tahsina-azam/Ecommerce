// api route for getting orders

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TAKA } from "@/components/products/product-item";
import { db } from "@/lib/db";
import products from "@/utils/data/products";
import type { NextApiRequest, NextApiResponse } from "next";

export type AggregateResponseData = {
  "Total Orders": number;
  "Total Sum": string;
  "Total Products": number;
  "Total Users": number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AggregateResponseData>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      const orders = await db.order.aggregate({
        _sum: {
          amount: true,
        },
      });
      const userCount = await db.user.count();

      const totalOrders = await db.order.count();
      const totalSum = orders._sum.amount || 0;
      const totalProducts = products.length;
      return res.status(200).json({
        "Total Sum": `${TAKA}${totalSum || 0}`,
        "Total Users": userCount,
        "Total Products": totalProducts,
        "Total Orders": totalOrders,
      });
    }
    default:
      return res.status(400).json({} as AggregateResponseData);
  }
}

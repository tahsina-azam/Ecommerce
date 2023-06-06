// api route for getting orders

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TAKA } from "@/components/products/product-item";
import { db } from "@/lib/db";
import products from "@/utils/data/products";
import type { NextApiRequest, NextApiResponse } from "next";

export type AggregateResponseData = {
  "Total Orders": number;
  "Total Sales": string;
  "Total Products": number;
  "Total Users": number;
  "Bank Deposit": string;
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
      const admin = await db.user.findFirst({
        where: {
          role: "admin",
        },
      });

      if (!admin) throw new Error(`Admin not found`);

      const adminBankAccount = await db.bank.findFirst({
        where: {
          accountId: admin.accountId,
        },
      });

      const totalOrders = await db.order.count();
      const totalSum = orders._sum.amount || 0;
      const totalProducts = products.length;
      return res.status(200).json({
        "Total Sales": `${TAKA}${totalSum || 0}`,
        "Total Users": userCount,
        "Total Products": totalProducts,
        "Total Orders": totalOrders,
        "Bank Deposit": `${TAKA}${adminBankAccount?.deposit}`,
      });
    }
    default:
      return res.status(400).json({} as AggregateResponseData);
  }
}

// api route for getting orders

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OrderData } from "@/global";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  orders?: OrderData[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      const orders = await db.order.findMany({
        include: {
          user: {
            select: {
              email: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

      const totalSales = await db.order.count();
      return res.status(200).json({ message: "John Doe", orders });
    }
    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
}

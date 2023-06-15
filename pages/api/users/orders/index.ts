// api route for getting orders

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { Order } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  orders?: Order[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const userId = req.query.userId as string;

  console.log({ method, userId });
  switch (method) {
    case "GET": {
      const orders = await db.order.findMany({
        where: {
          customerId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return res.status(200).json({ message: "John Doe", orders });
    }
    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
}

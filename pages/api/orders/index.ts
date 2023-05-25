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
  const status = req.query.status as string;
  switch (method) {
    case "GET":
      if (status === undefined) {
        const orders = await db.order.findMany({
          include: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        });
        return res.status(200).json({ message: "John Doe", orders });
      } else {
        const orders = await db.order.findMany({
          where: {
            status,
          },
          include: {
            user: {
              select: {
                email: true,
                name: true,
              },
            },
          },
        });
        return res.status(200).json({ message: "John Doe", orders });
      }
    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
}

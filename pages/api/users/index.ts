// api route for getting orders

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  users?: User[] | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET": {
      const users = await db.user.findMany({
        include: {
          bank: {
            select: {
              deposit: true,
            },
          },
        },
      });
      return res.status(200).json({ message: "John Doe", users });
    }
    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
}

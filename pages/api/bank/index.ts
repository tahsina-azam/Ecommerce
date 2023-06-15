// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { Bank } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  accountId?: string;
  bank?: Bank;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;

  if (method === "GET") {
    const accountId = req.query.accountId as string;

    const acc = await db.user.findFirst({
      where: {
        userId: accountId,
      },
    });
    const account = await db.bank.findUnique({
      where: {
        accountId: acc?.accountId,
      },
    });

    if (!account) {
      return res.status(401).json({ message: "Account not found" });
    }

    return res.status(200).json({
      message: "Bank account found successfully.",
      bank: account,
    });
  }
  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const account = await db.bank.create({
    data: {
      secret: "secret12345",
    },
  });

  if (!account) {
    return res.status(401).json({ message: "Account not found" });
  }

  return res.status(200).json({
    message: "Bank account created successfully.",
    accountId: account.accountId,
  });
}

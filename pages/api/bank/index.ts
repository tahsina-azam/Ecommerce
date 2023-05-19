// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  accountId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
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

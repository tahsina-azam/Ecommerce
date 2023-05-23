// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OrderData } from "@/components/checkout/PaymentDetails";
import { db } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export type OrderResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponseData>
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email, accountId, accountSecret, address } = req.body as OrderData;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "User doesn't exist" });
  }

  if (accountId != user.accountId) {
    return res
      .status(401)
      .json({ message: "Bank account number doesn't match." });
  }
  const account = await db.bank.findUnique({
    where: {
      accountId,
    },
  });

  if (!account) {
    return res.status(401).json({ message: "Account not found" });
  }

  if (account.secret !== accountSecret) {
    return res.status(401).json({ message: "Account secret doesn't match" });
  }

  //   const newUser = await db.user.create({
  //     data: {

  //       email,

  //       role: "user",
  //       address,
  //       bank: {
  //         connect: {
  //           accountId,
  //         },
  //       },
  //     },
  //   });

  //   if (!newUser) {
  //     return res.status(401).json({ message: "Registration failed" });
  //   }

  return res.status(200).json({
    message: "User registered successfully",
  });
}

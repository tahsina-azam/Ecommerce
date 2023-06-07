import { CartItem } from "@/global";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OrderData } from "@/components/checkout/PaymentDetails";
import { db } from "@/lib/db";
import { createTransaction, makeOrder } from "@/utils/helper";
import { Order } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  cartItems: CartItem[];
  totalPrice: number;
} & OrderData;
export type OrderResponseData = {
  message: string;
  error?: any;
  order?: Order | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponseData>
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email, accountId, accountSecret, address, cartItems, totalPrice } =
    req.body as Body;

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

  try {
    const admin = await db.user.findFirst({
      where: {
        role: "admin",
      },
      select: {
        userId: true,
        accountId: true,
      },
    });
    if (!admin) throw new Error(`Admin not found`);
    const transaction = await createTransaction({
      accountId,
      amount: totalPrice,
      receiverId: admin.accountId,
      receiverUserId: admin.userId,
    });
    if (!transaction) {
      return res.status(401).json({ message: "Transaction failed" });
    }
    var order = await makeOrder({
      userId: user.userId as string,
      address,
      products: cartItems,
      totalPrice,
      trxId: transaction.transactionId,
    });
    if (!order) {
      return res.status(401).json({ message: "Order failed" });
    }
  } catch (error) {
    console.log({ error });
    return res.status(401).json({ message: "Transaction failed", error });
  }

  return res.status(200).json({
    message: "Order successfully created",
    order,
  });
}

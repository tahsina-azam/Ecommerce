// api route for getting orders

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OrderStatus } from "@/components/orders";
import { db } from "@/lib/db";
import { createTransaction } from "@/utils/helper";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  const status = req.body.status as OrderStatus;
  const transactionId = req.body.transactionId as string;

  console.log({
    method,
    status,
    transactionId,
  });
  switch (method) {
    case "PATCH": {
      switch (status) {
        case "confirmed":
          try {
            const existingTransaction = await db.transaction.findUnique({
              where: {
                transactionId,
              },
            });

            if (!existingTransaction)
              return res.status(401).json({ message: "Transaction not found" });
            const supplier = await db.user.findFirst({
              where: {
                role: "supplier",
              },
              select: {
                userId: true,
                accountId: true,
              },
            });
            if (!supplier) throw new Error(`Supplier not found`);
            
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
              accountId: admin.accountId,
              amount: existingTransaction?.amount,
              receiverId: supplier.accountId,
              receiverUserId: supplier.userId,
            });
            console.log({ transaction });
            
            if (!transaction) {
              return res.status(401).json({ message: "Transaction failed" });
            }
            await db.order.update({
              where: {
                transactionId,
              },
              data: {
                status: "confirmed",
              },
            });
            await db.transaction.update({
              where: {
                transactionId,
              },
              data: {
                status: "confirmed",
              },
            });
            return res.status(200).json({ message: "Order confirmed" });
          } catch (error) {
            return res
              .status(401)
              .json({ message: "Order confirmation failed", error });
          }
        case "declined":
          try {
            const existingTransaction = await db.transaction.findUnique({
              where: {
                transactionId,
              },
            });

            if (!existingTransaction)
              return res.status(401).json({ message: "Transaction not found" });
            const receiver = await db.user.findFirst({
              where: {
                userId: existingTransaction?.senderId,
              },
            });
            if (!receiver) throw new Error(`Receiver not found`);
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
              accountId: admin.accountId,
              amount: existingTransaction?.amount,
              receiverId: receiver.accountId,
              receiverUserId: receiver.userId,
            });
            console.log({ transaction });
            if (!transaction) {
              return res.status(401).json({ message: "Transaction failed" });
            }
            await db.order.update({
              where: {
                transactionId,
              },
              data: {
                status: "declined",
              },
            });
            await db.transaction.update({
              where: {
                transactionId,
              },
              data: {
                status: "declined",
              },
            });
            return res.status(200).json({ message: "Order declined" });
          } catch (error) {
            return res
              .status(401)
              .json({ message: "Order declination failed", error });
          }
        case "shipping":
        case "delivered":
          try {
            await db.order.update({
              where: {
                transactionId,
              },
              data: {
                status,
              },
            });

            return res.status(200).json({ message: `Order ${status}` });
          } catch (error) {
            return res
              .status(401)
              .json({ message: "Order update failed", error });
          }
      }
    }

    default:
      return res.status(400).json({ message: "Method not allowed" });
  }
}

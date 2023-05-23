import { db } from "@/lib/db";
import { CartItem } from "global";

export const createTransaction = async ({
  accountId,
  amount,
}: {
  accountId: string;
  amount: number;
}) => {
  const admin = await db.user.findFirst({
    where: {
      role: "admin",
    },
    select: {
      userId: true,
      accountId: true,
    },
  });
  if (!admin) throw new Error("Admin not found");

  //decrement deposit from user
  const user = await db.bank.update({
    where: {
      accountId,
    },
    data: {
      deposit: {
        decrement: amount,
      },
    },
    select: {
      user: {
        select: {
          userId: true,
        },
      },
    },
  });

  if (!user) throw new Error("User not found");

  //increment deposit to admin
  await db.bank.update({
    where: {
      accountId: admin.accountId,
    },
    data: {
      deposit: {
        increment: amount,
      },
    },
  });

  //create transaction
  const trx = await db.transaction.create({
    data: {
      amount,
      sender: {
        connect: {
          userId: user.user?.userId,
        },
      },
      receiver: {
        connect: {
          userId: admin.userId,
        },
      },
    },
  });

  return trx;
};

export const makeOrder = async ({
  userId,
  address,
  products,
  totalPrice,
  trxId,
}: {
  userId: string;
  products: CartItem[];
  totalPrice: number;
  trxId: string;
  address: string;
}) => {
  const order = await db.order.create({
    data: {
      address,
      amount: totalPrice,
      transaction: {
        connect: {
          transactionId: trxId,
        },
      },
      products,
      user: {
        connect: {
          userId,
        },
      },
    },
  });

  return order;
};

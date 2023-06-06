import { CartItem } from "@/global";
import { db } from "@/lib/db";

export const createTransaction = async ({
  accountId,
  amount,
  receiverId,
  receiverUserId,
}: {
  accountId: string;
  amount: number;
  receiverId: string;
  receiverUserId: string;
}) => {
  //decrement deposit from user

  console.log({
    accountId,
    amount,
    receiverId,
    receiverUserId,
  });
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
      accountId: receiverId,
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
          userId: receiverUserId,
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

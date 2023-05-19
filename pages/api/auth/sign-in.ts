// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/lib/db";
import { User } from "global";
import type { NextApiRequest, NextApiResponse } from "next";

type Body = {
  email: string;
  password: string;
};

export type LoggedInResponseData = {
  message: string;
  user?: User;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoggedInResponseData>
) {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  const { email, password } = req.body as Body;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Password doesn't match" });
  }

  return res.status(200).json({
    message: "Logged-in successfully",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
}

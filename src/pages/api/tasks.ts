// src/pages/api/tasks.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession as getServerSession } from "next-auth";
import { authOptions as nextAuthOptions } from "./auth/[...nextauth]";
import { prisma } from "../../server/db/client";

const tasks = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, nextAuthOptions);
  if (session) {
    if (req.method === "GET") {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    }
    if (req.method === "PUT") {
      const { id, done } = req.body;
      const response = await prisma.task.update({
        where: { id },
        data: {
          done
        }
      })
      res.status(200).json(response)
    }
  } else {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
    });
  }
};

export default tasks;

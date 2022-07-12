import { createRouter } from "./context";
import { z } from "zod";

export const taskRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.task.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      name: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.create({
        data: input,
      });
    },
  })
  .mutation("remove", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    },
  });

import { createRouter } from "./context";
import { z } from "zod";

export const taskRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.task.findMany();
    },
  })
  .query("byId", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.findUnique({
        where: { id: input.id },
      });
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string().optional(),
      name: z.string(),
      content: z.string(),
      done: z.boolean().optional(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.task.update({
        where: { id: input.id },
        data: input,
      });
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

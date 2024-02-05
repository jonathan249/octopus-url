import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { links } from "~/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export const linkRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ url: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // create a short slug from the url
      const slug: string =
        uuidv4().substring(0, 6) + "-" + uuidv4().substring(0, 6);

      await ctx.db.insert(links).values({
        url: input.url,
        userId: "test",
        slug,
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.links.findMany({
      orderBy: (links, { desc }) => [desc(links.createdAt)],
    });
  }),
  bySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.links.findFirst({
        where(fields, operators) {
          return operators.eq(fields.slug, input.slug);
        },
      });
    }),
});

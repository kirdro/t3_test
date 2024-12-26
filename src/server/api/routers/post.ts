import { z } from 'zod';

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';
import { posts } from '@/server/db/schema';

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				text: z.string(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { name, text } = input;
			await ctx.db.insert(posts).values({
				name: name,
				createdById: ctx.session.user.id,
				text: text,
				username: ctx.session.user.name,
				userImg: ctx.session.user.image,
			});
		}),

	getLatest: protectedProcedure.query(async ({ ctx }) => {
		const post = await ctx.db.query.posts.findFirst({
			orderBy: (posts, { desc }) => [desc(posts.createdAt)],
		});

		return post ?? null;
	}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const posts = await ctx.db.query.posts.findMany();

		return posts ?? null;
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),
});

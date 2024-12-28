import { z } from 'zod';

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '@/server/api/trpc';

export const postRouter = createTRPCRouter({
	hello: publicProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input }) => {
			return {
				greeting: `Hello ${input.text}`,
			};
		}),

	create: protectedProcedure

		.input(z.object({ name: z.string().min(1), text: z.string().min(3) }))
		.mutation(async ({ ctx, input }) => {
			return ctx.db.post.create({
				data: {
					name: input.name,
					createdBy: { connect: { id: ctx.session.user.id } },
					text: input.text,
					username:
						ctx.session.user.name ? ctx.session.user.name : '',
					userImg:
						ctx.session.user.image ? ctx.session.user.image : '',
				},
			});
		}),

	getLatest: protectedProcedure.query(async ({ ctx }) => {
		const post = await ctx.db.post.findFirst({
			orderBy: { createdAt: 'desc' },
			where: { createdBy: { id: ctx.session.user.id } },
		});

		return post ?? null;
	}),

	getAll: protectedProcedure.query(async ({ ctx }) => {
		const posts = await ctx.db.post.findMany();

		return posts ?? null;
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return 'you can now see this secret message!';
	}),
});

'use client';
import { api } from '@/trpc/react';
import { PostsList } from '@/app/_components/posts/postsList';
import { CreatorPost } from '@/app/_components/posts/CreatorPost';
import type { IPost } from '@/app/posts/interfaces';

export const PostsWrapper = ({ initialPosts }: { initialPosts: IPost[] }) => {
	const [posts] = api.post.getAll.useSuspenseQuery<IPost[]>();

	return (
		<div
			className={
				'grid auto-rows-max w-full bg-gradient-to-r from-indigo-500 to-blue-500 h-dvh justify-center'
			}
		>
			<PostsList iPosts={posts} />
			<CreatorPost />
		</div>
	);
};

'use client';
import { api } from '@/trpc/react';
import { PostsList } from '@/app/_components/posts/postsList';
import { CreatorPost } from '@/app/_components/posts/CreatorPost';
import type { IPost } from '@/app/posts/interfaces';

export const PostsWrapper = ({ initialPosts }: { initialPosts: IPost[] }) => {
	const [posts] = api.post.getAll.useSuspenseQuery<IPost[]>();
	console.log('fdsafasdf', posts);
	return (
		<div
			className={
				'grid auto-rows-max w-full bg-gradient-to-r from-indigo-500 to-blue-500 h-dvh justify-center gap-2 grid-cols-w100'
			}
		>
			<div className={`grid w-full gap-3`}>
				<PostsList iPosts={posts} />
				<CreatorPost />
			</div>
		</div>
	);
};

'use client';
import { api } from '@/trpc/react';

import { CreatorPost } from '@/app/_components/posts/CreatorPost';
import { ItemPosts } from '@/app/_components/posts/ItemPosts';
import { IPost } from '@/app/posts/interfaces';

export const PostsWrapper = () => {
	const [posts] = api.post.getAll.useSuspenseQuery<IPost[]>();

	return (
		<div
			className={
				'grid w-dvw h-dvh auto-rows-max justify-center bg-cyan-600 rows-template-full'
			}
		>
			<div className={'grid w-96 h-full gap-2 overflow-auto'}>
				<div
					className={'grid auto-rows-max h-full gap-3 overflow-auto'}
				>
					{posts.map((item, i) => {
						return <ItemPosts key={`vvgfdvf${i}`} post={item} />;
					})}
					<div className={'h-28 w-full'}></div>
				</div>

				<CreatorPost />
			</div>
		</div>
	);
};

'use client';
import { api } from '@/trpc/react';

export const Posts = () => {
	const [posts] = api.post.getAll.useSuspenseQuery();
	return (
		<div className='grid w-1/2 row-auto grid-cols-none justify-center border border-cyan-200 bg-gradient-to-bl rounded-2xl'>
			{posts.map((item, i) => {
				return (
					<div className={'grid h'} key={`fadzsdgfv${i}`}>
						{item.name}
					</div>
				);
			})}
		</div>
	);
};

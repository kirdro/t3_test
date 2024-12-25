'use client';
import { api } from '@/trpc/react';
import { useState } from 'react';

export const CreatorPost = () => {
	const utils = api.useUtils();
	const [name, setName] = useState('');

	const createPost = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.post.invalidate();
			setName('');
		},
	});

	const onCreatePost = () => {
		createPost.mutate({ name });
	};
	return (
		<div
			className={
				'w-full max-w-screen-md h-max bg-gradient-to-r from-blue-400 to-blue-500 p-2 box-border'
			}
		>
			<input
				type='text'
				placeholder='Title'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='w-full rounded-full px-4 py-2 text-black'
			/>
			<button
				// type='submit'
				className='rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20'
				disabled={createPost.isPending}
				onClick={onCreatePost}
			>
				{createPost.isPending ? 'Submitting...' : 'Submit'}
			</button>
		</div>
	);
};

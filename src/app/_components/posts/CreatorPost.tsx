'use client';
import { api } from '@/trpc/react';
import { useState } from 'react';

export const CreatorPost = () => {
	const utils = api.useUtils();
	const [name, setName] = useState('');
	const [text, setText] = useState('');

	const createPost = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.post.invalidate();
			setName('');
			setText('');
		},
	});

	const onCreatePost = () => {
		createPost.mutate({ name, text });
	};
	return (
		<div
			className={
				'grid w-full max-w-screen-md h-max bg-gradient-to-r from-blue-400 to-blue-500 p-2 box-border gap-2'
			}
		>
			<input
				type='text'
				placeholder='Title'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='w-full rounded-2xl px-4 py-2 text-black'
			/>
			<textarea
				placeholder='Text'
				onChange={(e) => setText(e.target.value)}
				className='w-full rounded-2xl px-4 py-2 text-black'
				value={text}
			></textarea>
			<button
				// type='submit'
				className='rounded-2xl bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20'
				disabled={createPost.isPending}
				onClick={onCreatePost}
			>
				{createPost.isPending ? 'Submitting...' : 'Submit'}
			</button>
		</div>
	);
};

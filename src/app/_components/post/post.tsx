'use client';

import { useState } from 'react';

import { api } from '@/trpc/react';

export function LatestPost() {
	const [latestPost] = api.post.getLatest.useSuspenseQuery();
	const utils = api.useUtils();
	const [name, setName] = useState('');
	const [text, setText] = useState('');
	const createPost = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.post.invalidate();
			setName('');
		},
	});

	const onCreatePost = () => {
		createPost.mutate({ name, text });
	};

	return (
		<div className='w-full max-w-xs'>
			{latestPost ?
				<>
					<p className='truncate'>
						Your most recent post: {latestPost.name}
					</p>
				</>
			:	<p>You have no posts yet.</p>}
			<div>
				<input
					type='text'
					placeholder='Title'
					value={name}
					onChange={(e) => setName(e.target.value)}
					className='w-full rounded-full px-4 py-2 text-black'
				/>
				<input
					type='text'
					placeholder='Text'
					value={name}
					onChange={(e) => setText(e.target.value)}
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
		</div>
	);
}

'use client';
import { Button, Input, Textarea } from '@nextui-org/react';
import { api } from '@/trpc/react';
import React, { useState } from 'react';

export const CreatorPost = () => {
	const utils = api.useUtils();
	const [name, setName] = useState('');
	const [text, setText] = useState('');

	const { mutate, isPending } = api.post.create.useMutation({
		onSuccess: async () => {
			await utils.post.invalidate();
			setName('');
			setText('');
		},
	});

	const onClick = () => {
		mutate({ name, text });
	};

	const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
	};

	return (
		<div
			className={
				'grid w-96 h-max auto-rows-max gap-2 fixed bottom-1 bg-cyan-600 z-50'
			}
		>
			<Input
				label='Name'
				onChange={onChangeName}
				placeholder='Enter your name'
				type='text'
				value={name}
				variant={'bordered'}
				color={'default'}
			/>
			<Textarea
				// className='max-w-xs'
				label='Description'
				placeholder='Enter your description'
				value={text}
				variant={'bordered'}
				onChange={onChangeText}
			/>
			<Button
				isLoading={isPending}
				onClick={onClick}
				color='default'
				variant='bordered'
			>
				Send
			</Button>
		</div>
	);
};

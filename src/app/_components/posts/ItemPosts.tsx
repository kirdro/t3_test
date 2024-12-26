import getDate from '@/tools/getDate';
import type { FC } from 'react';
import type { IPost } from '@/app/posts/interfaces';

interface IProps {
	post: IPost;
}

export const ItemPosts: FC<IProps> = (props) => {
	const { post } = props;

	return (
		<div
			className={`grid auto-rows-max gap-1 rounded w-full justify-items-center border border-solid border-cyan-700 p-1 box-border`}
		>
			<div className={`grid w-full h-full grid-cols-2`}>
				<span className={`text-xs text-zinc-600`}>{post.username}</span>
				<span className={`text-xs text-blue-300 text-right`}>
					{getDate(String(post.createdAt))}
				</span>
			</div>
			<div className={`grid w-full h-full justify-items-end`}>
				<span className={`text-sm text-zinc-400`}>{post.name}</span>
			</div>
			<div className={`grid w-full h-full justify-items-start`}>
				<span>{post.text}</span>
			</div>
		</div>
	);
};

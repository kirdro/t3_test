import { type IPost } from '@/app/posts/interfaces';

export const PostsList = (props: { iPosts: IPost[] }) => {
	return (
		<div
			className={
				'grid w-full auto-rows-max h-max text-white gap-2 justify-center'
			}
		>
			{props.iPosts.map((item, i) => {
				return (
					<div
						key={`adfsdf${i}`}
						className={
							'grid auto-rows-max gap-1 w-max justify-items-center'
						}
					>
						<span>{item.name}</span>
						<span>{String(item.createdAt)}</span>
					</div>
				);
			})}
		</div>
	);
};

import { type IPost } from '@/app/posts/interfaces';
import { ItemPosts } from '@/app/_components/posts/ItemPosts';

export const PostsList = (props: { iPosts: IPost[] }) => {
	return (
		<div
			className={
				'grid auto-rows-auto w-full h-96 text-white gap-2 overflow-auto'
			}
		>
			{props.iPosts.map((item, i) => {
				return <ItemPosts key={`adfsdf${i}`} post={item} />;
			})}
		</div>
	);
};

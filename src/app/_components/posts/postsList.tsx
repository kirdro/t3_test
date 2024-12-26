import { type IPost } from '@/app/posts/interfaces';
import { ItemPosts } from '@/app/_components/posts/ItemPosts';

export const PostsList = (props: { iPosts: IPost[] }) => {
	return (
		<div className={'grid auto-rows-auto w-full h-max text-white gap-2'}>
			{props.iPosts.map((item, i) => {
				return <ItemPosts key={`adfsdf${i}`} post={item} />;
			})}
		</div>
	);
};

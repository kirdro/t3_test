import { Suspense } from 'react';
import { PostsWrapper } from '@/app/_components/posts/PostsWrapper';

export const dynamic = 'force-dynamic';

const Page = () => {
	return (
		<Suspense fallback={<div>Loading ...</div>}>
			<PostsWrapper initialPosts={[]} />
		</Suspense>
	);
};
export default Page;

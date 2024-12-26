import { PostsWrapper } from '@/app/_components/posts/PostsWrapper';
import { api, HydrateClient } from '@/trpc/server';
import { auth } from '@/server/auth';

export const dynamic = 'force-dynamic';

const Page = async () => {
	const session = await auth();

	if (session?.user) {
		void api.post.getAll.prefetch();
	}
	return (
		<HydrateClient>
			{session?.user && <PostsWrapper initialPosts={[]} />}
		</HydrateClient>
	);
};
export default Page;

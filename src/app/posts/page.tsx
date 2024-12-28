import { PostsWrapper } from '@/app/_components/posts/PostsWrapper';

import { auth } from '@/server/auth';
import { api, HydrateClient } from '@/trpc/server';

export const dynamic = 'force-dynamic';

const Page = async () => {
	const session = await auth();

	if (session?.user) {
		void api.post.getAll.prefetch();
	}
	return (
		<HydrateClient>
			<div>{session?.user && <PostsWrapper />}</div>
		</HydrateClient>
	);
};

export default Page;

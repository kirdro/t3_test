import type { IPost } from '@/app/posts/interfaces';
import type { FC } from 'react';
import {
	Avatar,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
} from '@nextui-org/react';
import { getDateTime } from '@/tools/getDateTime';

interface IProps {
	post: IPost;
}

export const ItemPosts: FC<IProps> = (props) => {
	const { post } = props;

	const { name, userImg, username, createdAt, text } = post;

	console.log('ssdfgafdsaf', post);

	return (
		<div>
			<Card className='max-w-[340px] bg-cyan-950'>
				<CardHeader className='justify-between'>
					<div className='flex gap-5'>
						<Avatar
							isBordered
							radius='full'
							size='md'
							src={userImg}
						/>
						<div className='flex flex-col gap-1 items-start justify-center'>
							<h4 className='text-small font-semibold leading-none text-default-600'>
								{username} {String(getDateTime(createdAt))}
							</h4>
							<h5 className='text-small tracking-tight text-default-400'>
								{name}
							</h5>
						</div>
					</div>
				</CardHeader>
				<CardBody className='px-3 py-0 text-small text-default-400'>
					<p>{text}</p>
					{/*<span className='pt-2'>*/}
					{/*	#FrontendWithZoey*/}
					{/*	<span aria-label='computer' className='py-2' role='img'>*/}
					{/*		💻*/}
					{/*	</span>*/}
					{/*</span>*/}
				</CardBody>
				<CardFooter className='gap-3'>
					<div className='flex gap-1'>
						<p className='font-semibold text-default-400 text-small'>
							0
						</p>
						<p className=' text-default-400 text-small'>
							Following
						</p>
					</div>
					<div className='flex gap-1'>
						<p className='font-semibold text-default-400 text-small'>
							0
						</p>
						<p className='text-default-400 text-small'>Followers</p>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};

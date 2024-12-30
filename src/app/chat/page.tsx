import { MassageList } from '@/app/_components/chat/MassageList';

const Page = () => {
	return (
		<div
			className={
				'grid w-dvw h-dvh grid-t-rows-max grid-cols-w100 justify-center'
			}
		>
			<MassageList />
		</div>
	);
};

export default Page;

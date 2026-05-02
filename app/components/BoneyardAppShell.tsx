'use client';

import { Skeleton } from 'boneyard-js/react';
import '@/app/bones/register-defaults';
import { useAppLoading } from '@/hooks/useAppLoading';

type Props = {
	children: React.ReactNode;
};

/**
 * Bọc toàn bộ nội dung route: khi Redux đang fetch, hiển thị skeleton Boneyard đồng bộ.
 */
export default function BoneyardAppShell({ children }: Props) {
	const loading = useAppLoading();

	return (
		<Skeleton name='app-shell' loading={loading} className='relative min-h-[40vh] w-full'>
			{children}
		</Skeleton>
	);
}

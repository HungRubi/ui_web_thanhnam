'use client';

import { Skeleton } from 'boneyard-js/react';
import '@/app/bones/register-defaults';

/**
 * Fallback Suspense khi chuyển trang (App Router) — cùng tên xương với BoneyardAppShell.
 */
export default function RootLoading() {
	return (
		<div className='w-full px-3 py-8'>
			<Skeleton name='app-shell' loading>
				<span className='sr-only'>Đang tải trang</span>
			</Skeleton>
		</div>
	);
}

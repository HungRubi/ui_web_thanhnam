'use client';

import { useAppSelector } from '@/store/hooks';

/**
 * true khi bất kỳ slice dữ liệu chính nào đang fetch — dùng chung cho Boneyard.
 */
export function useAppLoading(): boolean {
	return useAppSelector(
		s =>
			s.globalConfig.loading ||
			s.category.loading ||
			s.store.loading ||
			s.news.loading ||
			s.deal.loading ||
			s.event.loading ||
			s.social.loading
	);
}

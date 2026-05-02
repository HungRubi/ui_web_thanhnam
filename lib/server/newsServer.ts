import { cache } from 'react';
import type { News } from '@/lib/api';
import { getApiBase } from './urls';

export const getNewsBySlugServer = cache(async (slug: string): Promise<News | null> => {
	const base = getApiBase();
	const listRes = await fetch(`${base}/new`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 300 },
	});
	if (!listRes.ok) return null;
	const listJson = await listRes.json();
	const list: News[] = listJson?.data?.newFormat || [];
	const item = list.find(n => n.slug === slug);
	if (!item) return null;

	if (!item._id) return item;

	const detailRes = await fetch(`${base}/new/${item._id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 300 },
	});
	if (!detailRes.ok) return item;
	const detailJson = await detailRes.json();
	const news: News | undefined = detailJson?.data?.news;
	if (news && typeof news === 'object') {
		return { ...item, ...news };
	}
	return item;
});

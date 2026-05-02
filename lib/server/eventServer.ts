import { cache } from 'react';
import type { Event } from '@/lib/api';
import { getApiBase } from './urls';

export const getEventBySlugServer = cache(async (slug: string): Promise<Event | null> => {
	const base = getApiBase();
	const res = await fetch(`${base}/event`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 300 },
	});
	if (!res.ok) return null;
	const json = await res.json();
	const list: Event[] = json?.data?.eventFormat || [];
	const found = list.find(e => e.slug === slug);
	return found ?? null;
});

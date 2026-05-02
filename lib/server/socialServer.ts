import type { SocialConfig } from '@/lib/api';
import { getApiBase } from './urls';

export async function getSocialSameAsUrls(): Promise<string[]> {
	try {
		const res = await fetch(`${getApiBase()}/social`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			next: { revalidate: 3600 },
		});
		if (!res.ok) return [];
		const json = await res.json();
		const s: SocialConfig | undefined = json?.data;
		if (!s) return [];
		const urls = [s.facebook, s.facebookPage, s.twitter, s.instagram, s.pinterest, s.youtube].filter(
			(u): u is string => typeof u === 'string' && u.trim().length > 0
		);
		return [...new Set(urls)];
	} catch {
		return [];
	}
}

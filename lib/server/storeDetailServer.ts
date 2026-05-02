import { cache } from 'react';
import type { Store } from '@/lib/api';
import { getApiBase } from './urls';

export type StoreOffer = {
	_id?: string;
	name?: string;
	description?: string;
	image?: string;
	price?: number;
	offer?: string;
	url?: string;
};

export type StoreDetailPayload = {
	store: Store;
	offers: StoreOffer[];
};

export const getStoreDetailBySlug = cache(async (slug: string): Promise<StoreDetailPayload | null> => {
	const API_BASE = getApiBase();
	const listResponse = await fetch(`${API_BASE}/store`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 120 },
	});

	if (!listResponse.ok) return null;

	const listResult = await listResponse.json();
	const stores = listResult.data?.storeFormat || [];
	const storeBySlug = stores.find((s: { slug: string; _id?: string }) => s.slug === slug);

	if (!storeBySlug?._id) return null;

	const detailResponse = await fetch(`${API_BASE}/store/${storeBySlug._id}`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		next: { revalidate: 120 },
	});

	if (!detailResponse.ok) return null;

	const detailResult = await detailResponse.json();
	const detailData = detailResult.data || detailResult;

	if (!detailData) return null;

	if (detailData.store) {
		return {
			store: detailData.store as Store,
			offers: Array.isArray(detailData.offers) ? detailData.offers : [],
		};
	}

	return {
		store: detailData as Store,
		offers: [],
	};
});

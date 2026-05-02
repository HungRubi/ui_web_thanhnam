import { cache } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export type CategoryData = {
	category?: {
		_id: string;
		tendanhmuc: string;
		slug: string;
		sapxep: number;
		danhmuccha?: string;
		image?: string;
		hienthi: boolean;
		hienthitrangchu: boolean;
		mota?: string;
		metatitle?: string;
		metakeywords?: string;
		metadescription?: string;
	};

	stores?: Array<{
		_id: string;
		slug: string;
		tenstore: string;
		image?: string;
		motangan?: string;
		totalCoupons?: number;
	}>;
};

export const fetchCategoryBySlug = cache(async (slug: string): Promise<CategoryData | null> => {
	try {
		const res = await fetch(`${API_BASE}/category/slug/${encodeURIComponent(slug)}`, {
			next: { revalidate: 300 },
		});
		if (!res.ok) return null;
		const json = await res.json();
		return json?.data || null;
	} catch (err) {
		console.error('Error fetching category:', err);
		return null;
	}
});

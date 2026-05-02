const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/** Trình duyệt: cache mặc định (HTTP + BFF revalidate); không dùng no-store. */

export interface GlobalConfig {
	_id?: string;
	name: string;
	logo?: string;
	favicon?: string;
	blockIndex: 'Yes' | 'No';
	slogan: string;
	notifi1?: string;
	notifi2?: string;
	nameCompany: string;
	userPost?: string;
	hotline?: string;
	phone?: string;
	address?: string;
	email?: string;
	copyRight: string;
	linkDKBCT?: string;
	googleMap?: string;
	footer?: string;
	contact?: string;
	lastUpdate?: string;
	createdAt?: string;
	updatedAt?: string;
}

/** Used when /global fails or omits required fields — replace with your real brand before production. */
export const GLOBAL_CONFIG_FALLBACK: GlobalConfig = {
	name: 'Coupon & Deals Hub',
	logo: '/images/logo.jpg',
	favicon: '/images/icon.png',
	blockIndex: 'No',
	slogan: "We aggregate discounts from partner stores. Tap a deal to open the merchant's official site and complete your purchase there.",
	nameCompany: 'Coupon & Deals Hub',
	copyRight: '© 2026 Coupon & Deals Hub. All rights reserved.',
	hotline: '1-800-000-0000',
	phone: '+1 (000) 000-0000',
	address: "Online coupon directory — purchases are made on each retailer's website.",
	email: 'support@example.com',
	userPost: undefined,
	linkDKBCT: undefined,
	googleMap: undefined,
	footer: undefined,
	contact: undefined,
	lastUpdate: undefined,
};

export interface ApiResponse<T> {
	data: T;
	message?: string;
}

function mergeOptionalText(raw: Record<string, unknown>, key: string, fallback?: string): string | undefined {
	const v = raw[key];
	if (typeof v === 'string' && v.trim()) return v.trim();
	return fallback;
}

function mergeRequiredText(raw: Record<string, unknown>, key: string, fallback: string): string {
	const v = raw[key];
	if (typeof v === 'string' && v.trim()) return v.trim();
	return fallback;
}

/** Merges API payload with GLOBAL_CONFIG_FALLBACK so UI/SEO always get complete fields. */
export function normalizeGlobalConfig(raw: unknown): GlobalConfig {
	const p = raw && typeof raw === 'object' && !Array.isArray(raw) ? (raw as Record<string, unknown>) : {};

	const blockIndex: 'Yes' | 'No' = p.blockIndex === 'Yes' || p.blockIndex === 'No' ? p.blockIndex : 'No';

	return {
		...GLOBAL_CONFIG_FALLBACK,
		_id: typeof p._id === 'string' && p._id.trim() ? p._id.trim() : undefined,
		name: mergeRequiredText(p, 'name', GLOBAL_CONFIG_FALLBACK.name),
		slogan: mergeRequiredText(p, 'slogan', GLOBAL_CONFIG_FALLBACK.slogan),
		nameCompany: mergeRequiredText(p, 'nameCompany', GLOBAL_CONFIG_FALLBACK.nameCompany),
		copyRight: mergeRequiredText(p, 'copyRight', GLOBAL_CONFIG_FALLBACK.copyRight),
		blockIndex,
		logo: mergeOptionalText(p, 'logo'),
		favicon: mergeOptionalText(p, 'favicon'),
		hotline: mergeOptionalText(p, 'hotline', GLOBAL_CONFIG_FALLBACK.hotline),
		phone: mergeOptionalText(p, 'phone', GLOBAL_CONFIG_FALLBACK.phone),
		address: mergeOptionalText(p, 'address', GLOBAL_CONFIG_FALLBACK.address),
		email: mergeOptionalText(p, 'email', GLOBAL_CONFIG_FALLBACK.email),
		notifi1: mergeOptionalText(p, 'notifi1'),
		notifi2: mergeOptionalText(p, 'notifi2'),
		userPost: mergeOptionalText(p, 'userPost'),
		linkDKBCT: mergeOptionalText(p, 'linkDKBCT'),
		googleMap: mergeOptionalText(p, 'googleMap'),
		footer: mergeOptionalText(p, 'footer', GLOBAL_CONFIG_FALLBACK.footer),
		contact: mergeOptionalText(p, 'contact', GLOBAL_CONFIG_FALLBACK.contact),
		lastUpdate: mergeOptionalText(p, 'lastUpdate'),
		createdAt: mergeOptionalText(p, 'createdAt'),
		updatedAt: mergeOptionalText(p, 'updatedAt'),
	};
}

export const fetchGlobalConfig = async (): Promise<GlobalConfig> => {
	try {
		const response = await fetch(`${API_BASE_URL}/global`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 3600 },
		});

		if (!response.ok) {
			console.warn('fetchGlobalConfig: HTTP', response.status, '— using GLOBAL_CONFIG_FALLBACK');
			return normalizeGlobalConfig(null);
		}

		let body: unknown;
		try {
			body = await response.json();
		} catch {
			return normalizeGlobalConfig(null);
		}

		const rawData =
			body &&
			typeof body === 'object' &&
			body !== null &&
			'data' in body &&
			(body as ApiResponse<unknown>).data !== undefined
				? (body as ApiResponse<unknown>).data
				: body;

		return normalizeGlobalConfig(rawData);
	} catch (error) {
		console.error('Error fetching global config:', error);
		return normalizeGlobalConfig(null);
	}
};

// Content config interfaces
export interface ContentConfig {
	_id?: string;
	name: string;
	description?: string;
	howToApply?: string;
	FAQs?: string;
	createdAt?: string;
	updatedAt?: string;
}

export const fetchContentConfig = async (): Promise<ContentConfig> => {
	try {
		const response = await fetch('/api/content-config', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<ContentConfig> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching content config:', error);
		throw error;
	}
};

// SEO config interfaces
export interface SeoConfig {
	_id?: string;
	metaTitle?: string;
	metaKeywords?: string;
	metaDescription?: string;
	googleAnalyticCode?: string;
	createdAt?: string;
	updatedAt?: string;
}

export const fetchSeoConfig = async (): Promise<SeoConfig> => {
	try {
		const response = await fetch('/api/seo', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<SeoConfig> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching seo config:', error);
		throw error;
	}
};

// Category interfaces
export interface Category {
	_id?: string;
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
	formatDate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CategoryResponse {
	categoryFormat?: Category[];
	searchCategory?: Category[];
	totalPage?: number;
	searchType: boolean;
}

export const fetchCategories = async (searchQuery?: string): Promise<CategoryResponse> => {
	try {
		const url = searchQuery ? `/api/category?timkiem=${encodeURIComponent(searchQuery)}` : '/api/category';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<CategoryResponse> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		throw error;
	}
};

// Store interfaces
export interface Store {
	_id?: string;
	tenstore: string;
	slug: string;
	danhmuc: Category | string;
	stt: number;
	event: string;
	image?: string;
	duyetbai: 'Yes' | 'No';
	motangan?: string;
	about?: string;
	howtoapply?: string;
	faqs?: string;
	metatitle?: string;
	metadescription?: string;
	metakeywords?: string;
	formatDate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface StoreResponse {
	storeFormat?: Store[];
	searchStore?: Store[];
	totalPage?: number;
	searchType: boolean;
}

export const fetchStores = async (searchQuery?: string): Promise<StoreResponse> => {
	try {
		const url = searchQuery ? `/api/store?timkiem=${encodeURIComponent(searchQuery)}` : '/api/store';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<StoreResponse> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching stores:', error);
		throw error;
	}
};

export const fetchStoreBySlug = async (slug: string): Promise<Store> => {
	try {
		const response = await fetch(`/api/store/${slug}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<Store> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching store by slug:', error);
		throw error;
	}
};

// News interfaces
export interface News {
	_id?: string;
	name: string;
	slug: string;
	category: Category | string;
	image?: string;
	duyet: 'Yes' | 'No';
	description?: string;
	content?: string;
	metatitle?: string;
	metadescription?: string;
	metakeywords?: string;
	formatDate?: string;
	lastUpdate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface NewsResponse {
	newFormat?: News[];
	searchNew?: News[];
	totalPage?: number;
	searchType: boolean;
}

export const fetchNews = async (searchQuery?: string): Promise<NewsResponse> => {
	try {
		const url = searchQuery ? `/api/new?timkiem=${encodeURIComponent(searchQuery)}` : '/api/new';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<NewsResponse> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching news:', error);
		throw error;
	}
};

export const fetchNewsById = async (id: string): Promise<News> => {
	try {
		const response = await fetch(`/api/new/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<{ news: News }> = await response.json();
		return result.data.news;
	} catch (error) {
		console.error('Error fetching news by id:', error);
		throw error;
	}
};

// Event interfaces
export interface Event {
	_id?: string;
	tendanhmuc: string;
	slug: string;
	sapxep?: number;
	danhmuccha?: string;
	image?: string;
	hienthi?: boolean;
	hienthitrangchu?: boolean;
	mota?: string;
	metatitle?: string;
	metakeywords?: string;
	metadescription?: string;
	formatDate?: string;
	createdAt?: string;
	updatedAt?: string;
}

// Response khi get danh sách event
export interface EventResponse {
	eventFormat?: Event[];
	searchEvent?: Event[];
	searchType: boolean;
}

// Response khi get chi tiết event theo id
export interface EventDetail {
	event: Event;
}

export const fetchEvents = async (searchQuery?: string): Promise<EventResponse> => {
	try {
		const url = searchQuery ? `/api/event?timkiem=${encodeURIComponent(searchQuery)}` : '/api/event';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<EventResponse> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching events:', error);
		throw error;
	}
};

export const fetchEventById = async (id: string): Promise<EventDetail> => {
	try {
		const response = await fetch(`/api/event/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: EventDetail = await response.json();
		return result;
	} catch (error) {
		console.error('Error fetching event by id:', error);
		throw error;
	}
};

// Social config interfaces
export interface SocialConfig {
	_id?: string;
	image?: string;
	facebook?: string;
	facebookPage?: string;
	twitter?: string;
	instagram?: string;
	pinterest?: string;
	youtube?: string;
	createdAt?: string;
	updatedAt?: string;
}

export const fetchSocialConfig = async (): Promise<SocialConfig> => {
	try {
		const response = await fetch('/api/social', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<SocialConfig> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching social config:', error);
		throw error;
	}
};

// Deal interfaces
export interface Deal {
	_id?: string;
	name: string;
	slug: string;
	danhmuc?: string;
	originalPrice?: number;
	price?: number;
	url?: string;
	image?: string;
	duyet: 'Yes' | 'No';
	description?: string;
	metatitle?: string;
	metadescription?: string;
	metakeywords?: string;
	formatDate?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface DealResponse {
	dealFormat?: Deal[];
	searchDeal?: Deal[];
	totalPage?: number;
	searchType: boolean;
}

export const fetchDeals = async (searchQuery?: string): Promise<DealResponse> => {
	try {
		const url = searchQuery ? `/api/deal?timkiem=${encodeURIComponent(searchQuery)}` : '/api/deal';

		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'default',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result: ApiResponse<DealResponse> = await response.json();
		return result.data;
	} catch (error) {
		console.error('Error fetching deals:', error);
		throw error;
	}
};

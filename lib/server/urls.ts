export function getApiBase(): string {
	return (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000').replace(/\/$/, '');
}

export function getSiteUrl(): string {
	return (process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com').replace(/\/$/, '');
}

/** Chuẩn hóa URL ảnh/asset cho OG và JSON-LD (yêu cầu URL tuyệt đối). */
export function absoluteAssetUrl(path?: string | null): string | undefined {
	if (!path || typeof path !== 'string') return undefined;
	const t = path.trim();
	if (!t) return undefined;
	if (t.startsWith('http://') || t.startsWith('https://')) return t;
	const base = getApiBase();
	const p = t.startsWith('/') ? t : `/${t}`;
	return `${base}${p}`;
}

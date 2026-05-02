/**
 * logo / favicon từ global config:
 * - Bắt đầu bằng `/` → file trong `public` (vd: `/images/logo.jpg`)
 * - `http(s)://` → giữ nguyên
 * - Còn lại → path trên API (vd: `uploads/file.png`)
 */
export function resolveGlobalMediaUrl(path: string | undefined | null): string | undefined {
	if (!path || typeof path !== 'string') return undefined;
	const t = path.trim();
	if (!t) return undefined;
	if (t.startsWith('http://') || t.startsWith('https://')) return t;
	const site = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/$/, '');
	const api = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
	if (t.startsWith('/')) {
		return site ? `${site}${t}` : t;
	}
	if (!api) return undefined;
	return `${api}/${t.replace(/^\//, '')}`;
}

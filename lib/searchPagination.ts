/** Query chuẩn cho /search (phân trang + timkiem + category). */
export function buildSearchPageHref(qTrim: string, catTrim: string, pageNum: number): string {
	const p = new URLSearchParams();
	if (qTrim) p.set('timkiem', qTrim);
	if (catTrim) p.set('category', catTrim);
	if (pageNum > 1) p.set('page', String(pageNum));
	const qs = p.toString();
	return qs ? `/search?${qs}` : '/search';
}

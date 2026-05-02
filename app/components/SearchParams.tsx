'use client';

import { useSearchParams } from 'next/navigation';

export default function SearchParamsKey() {
	const params = useSearchParams();
	return <div>Search Results for key &quot;{params.get('timkiem')}&quot;</div>;
}

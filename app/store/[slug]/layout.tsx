import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getStoreDetailBySlug } from '@/lib/server/storeDetailServer';
import { getSiteUrl, absoluteAssetUrl } from '@/lib/server/urls';
import { generateBreadcrumbSchema, generateProductSchema } from '@/lib/schemaOrg';
import { JsonLd } from '@/app/components/JsonLd';

type Props = {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
};

function firstNumericPrice(offers: Array<{ price?: number }>): number | undefined {
	for (const o of offers) {
		if (typeof o.price === 'number' && !Number.isNaN(o.price)) {
			return o.price;
		}
	}
	return undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const detail = await getStoreDetailBySlug(slug);
	const base = getSiteUrl();

	if (!detail?.store) {
		return {
			title: 'Cửa hàng',
			robots: { index: false, follow: false },
		};
	}

	const { store } = detail;
	const title = store.metatitle || store.tenstore || 'Store';
	const description = store.metadescription || store.motangan || store.about || undefined;
	const img = absoluteAssetUrl(store.image);
	const notForIndex = store.duyetbai === 'No';

	return {
		metadataBase: new URL(base),
		title,
		description,
		keywords: store.metakeywords,
		robots: notForIndex ? ({ index: false, follow: true } as const) : ({ index: true, follow: true } as const),
		alternates: { canonical: `${base}/store/${slug}` },
		openGraph: {
			title,
			description,
			url: `${base}/store/${slug}`,
			images: img ? [{ url: img }] : undefined,
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: img ? [img] : undefined,
		},
	};
}

export default async function StoreSlugLayout({ children, params }: Props) {
	const { slug } = await params;
	const detail = await getStoreDetailBySlug(slug);
	const site = getSiteUrl();

	const scripts: ReactNode[] = [];

	if (detail?.store) {
		const { store, offers } = detail;
		const img = absoluteAssetUrl(store.image);
		const desc =
			store.metadescription ||
			store.motangan ||
			(typeof store.about === 'string' ? store.about.replace(/<[^>]+>/g, '').slice(0, 300) : '') ||
			`${store.tenstore} — mã giảm giá`;

		scripts.push(
			<JsonLd
				key='breadcrumb'
				data={generateBreadcrumbSchema([
					{ name: 'Trang chủ', url: site },
					{ name: store.tenstore, url: `${site}/store/${slug}` },
				])}
			/>
		);

		const price = firstNumericPrice(offers);
		if (price !== undefined) {
			scripts.push(
				<JsonLd key='product' data={generateProductSchema(store.tenstore, desc, img, price, 'USD')} />
			);
		}
	}

	return (
		<>
			{scripts}
			{children}
		</>
	);
}

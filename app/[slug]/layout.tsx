import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getEventBySlugServer } from '@/lib/server/eventServer';
import { getSiteUrl, absoluteAssetUrl } from '@/lib/server/urls';
import { generateBreadcrumbSchema, generateCollectionPageSchema } from '@/lib/schemaOrg';
import { JsonLd } from '@/app/components/JsonLd';

type Props = {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const event = await getEventBySlugServer(slug);
	const base = getSiteUrl();

	if (!event || event.hienthi === false) {
		return {
			title: 'Sự kiện',
			description: '',
			robots: { index: false, follow: false },
		};
	}

	const title = event.metatitle || event.tendanhmuc || 'Sự kiện';
	const description = event.metadescription || event.mota || `${event.tendanhmuc} — mã giảm giá`;
	const img = absoluteAssetUrl(event.image);

	return {
		metadataBase: new URL(base),
		title,
		description,
		keywords: event.metakeywords,
		alternates: { canonical: `${base}/${slug}` },
		openGraph: {
			title,
			description,
			url: `${base}/${slug}`,
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

export default async function EventSlugLayout({ children, params }: Props) {
	const { slug } = await params;
	const event = await getEventBySlugServer(slug);
	const site = getSiteUrl();

	const scripts: ReactNode[] = [];

	if (event && event.hienthi !== false) {
		const desc = event.metadescription || event.mota || '';
		const img = absoluteAssetUrl(event.image);
		scripts.push(
			<JsonLd
				key='breadcrumb'
				data={generateBreadcrumbSchema([
					{ name: 'Trang chủ', url: site },
					{ name: event.tendanhmuc, url: `${site}/${slug}` },
				])}
			/>
		);
		scripts.push(
			<JsonLd
				key='collection'
				data={generateCollectionPageSchema(`${event.tendanhmuc} — Mã giảm giá`, desc, `${site}/${slug}`, img)}
			/>
		);
	}

	return (
		<>
			{scripts}
			{children}
		</>
	);
}

import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { getNewsBySlugServer } from '@/lib/server/newsServer';
import { getSiteUrl, absoluteAssetUrl } from '@/lib/server/urls';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/schemaOrg';
import { fetchGlobalConfig } from '@/lib/api';
import { JsonLd } from '@/app/components/JsonLd';

type Props = {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const news = await getNewsBySlugServer(slug);
	const base = getSiteUrl();

	if (!news || news.duyet !== 'Yes') {
		return {
			title: 'Không tìm thấy bài viết',
			description: 'Bài viết không tồn tại hoặc chưa được xuất bản.',
			robots: { index: false, follow: false },
		};
	}

	const title = news.metatitle || news.name;
	const description = news.metadescription || news.description || `${news.name} — Blog`;
	const img = absoluteAssetUrl(news.image);

	return {
		metadataBase: new URL(base),
		title,
		description,
		keywords: news.metakeywords,
		alternates: { canonical: `${base}/blog/${slug}` },
		openGraph: {
			type: 'article',
			url: `${base}/blog/${slug}`,
			title,
			description,
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

export default async function BlogSlugLayout({ children, params }: Props) {
	const { slug } = await params;
	const news = await getNewsBySlugServer(slug);
	const site = getSiteUrl();
	const global = await fetchGlobalConfig();
	const authorName = global.nameCompany || 'Ban biên tập';

	const scripts: ReactNode[] = [];

	if (news && news.duyet === 'Yes') {
		scripts.push(
			<JsonLd
				key='breadcrumb'
				data={generateBreadcrumbSchema([
					{ name: 'Trang chủ', url: site },
					{ name: 'Blog', url: `${site}/blog` },
					{ name: news.name, url: `${site}/blog/${slug}` },
				])}
			/>
		);
		scripts.push(
			<JsonLd
				key='article'
				data={generateArticleSchema(
					news.name,
					news.metadescription || news.description || '',
					absoluteAssetUrl(news.image),
					news.createdAt || news.formatDate || '',
					news.updatedAt || news.lastUpdate || news.createdAt || news.formatDate || '',
					authorName
				)}
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

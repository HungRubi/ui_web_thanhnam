import { Metadata } from 'next';
import { fetchCategoryBySlug } from '@/lib/categoryApi';
import { getSiteUrl, absoluteAssetUrl } from '@/lib/server/urls';
import { generateBreadcrumbSchema } from '@/lib/schemaOrg';
import { JsonLd } from '@/app/components/JsonLd';

type Props = {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params;
	const data = await fetchCategoryBySlug(slug);
	const base = getSiteUrl();

	if (!data?.category) {
		return {
			title: 'Không tìm thấy danh mục',
			description: '',
			robots: { index: false, follow: false },
		};
	}

	const category = data.category;
	const title = category.metatitle || category.tendanhmuc;
	const description = category.metadescription || category.mota || `${category.tendanhmuc}`;
	const img = absoluteAssetUrl(category.image);

	return {
		metadataBase: new URL(base),
		title,
		description,
		keywords: category.metakeywords,
		alternates: { canonical: `${base}/category/${slug}` },
		openGraph: {
			title,
			description,
			url: `${base}/category/${slug}`,
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

export default async function CategoryLayout({ children, params }: Props) {
	const { slug } = await params;
	const data = await fetchCategoryBySlug(slug);
	const site = getSiteUrl();
	const cat = data?.category;

	return (
		<>
			{cat ? (
				<JsonLd
					data={generateBreadcrumbSchema([
						{ name: 'Trang chủ', url: site },
						{ name: cat.tendanhmuc, url: `${site}/category/${slug}` },
					])}
				/>
			) : null}
			{children}
		</>
	);
}

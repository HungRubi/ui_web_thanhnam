import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import StoreProvider from '@/app/components/StoreProvider';
import BoneyardAppShell from '@/app/components/BoneyardAppShell';
import { getSeoConfig } from '@/lib/server/seoConfig';
import { fetchGlobalConfig } from '@/lib/api';
import { generateOrganizationSchema, generateWebsiteSchema } from '@/lib/schemaOrg';
import { getSiteUrl } from '@/lib/server/urls';
import { getSocialSameAsUrls } from '@/lib/server/socialServer';
import { resolveGlobalMediaUrl } from '@/lib/resolveGlobalMediaUrl';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

const DEFAULT_META = {
	title: 'Coupon & Deals Hub',
	description: 'Coupons and promo codes from partner stores.',
};

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 5,
	themeColor: '#ffffff',
};

export async function generateMetadata(): Promise<Metadata> {
	const [seo, globalConfig] = await Promise.all([getSeoConfig(), fetchGlobalConfig()]);
	const siteUrl = getSiteUrl();

	const favicon = globalConfig.favicon ? resolveGlobalMediaUrl(globalConfig.favicon) : undefined;

	const title = seo?.metaTitle || globalConfig.name?.trim() || DEFAULT_META.title;
	const description = seo?.metaDescription || globalConfig.slogan?.trim() || DEFAULT_META.description;

	const blockIndexing = globalConfig.blockIndex === 'Yes';
	const robots = blockIndexing ? ({ index: false, follow: true } as const) : ('index, follow' as const);

	const ogImageUrl = resolveGlobalMediaUrl(globalConfig.logo) ?? `${siteUrl}/images/logo.jpg`;

	const metadata: Metadata = {
		metadataBase: new URL(siteUrl),
		title,
		description,
		keywords: seo?.metaKeywords,
		robots,
		openGraph: {
			type: 'website',
			url: siteUrl,
			title,
			description,
			siteName: title,
			images: [{ url: ogImageUrl }],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImageUrl],
		},
	};

	if (favicon) {
		metadata.icons = {
			icon: favicon,
		};
	}

	return metadata;
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const seoConfig = await getSeoConfig();
	const globalConfig = await fetchGlobalConfig();
	const sameAs = await getSocialSameAsUrls();
	const siteUrl = getSiteUrl();
	const orgLogo = resolveGlobalMediaUrl(globalConfig.logo) ?? '';

	return (
		<html lang='vi'>
			<head>
				{globalConfig && (
					<script
						type='application/ld+json'
						dangerouslySetInnerHTML={{
							__html: JSON.stringify(
								generateOrganizationSchema(
									globalConfig.nameCompany || 'Company',
									orgLogo,
									globalConfig.slogan || '',
									sameAs.length > 0 ? sameAs : undefined
								)
							),
						}}
					/>
				)}

				<script
					type='application/ld+json'
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(
							generateWebsiteSchema(seoConfig?.metaTitle || DEFAULT_META.title, siteUrl)
						),
					}}
				/>

				{/* Google Analytics */}
				{seoConfig?.googleAnalyticCode && (
					<script
						dangerouslySetInnerHTML={{
							__html: `
                try {
                  ${seoConfig.googleAnalyticCode}
                } catch (e) {
                  console.warn('Analytics script error:', e);
                }
              `,
						}}
					/>
				)}

				{/* Preconnect to external domains for performance */}
				{process.env.NEXT_PUBLIC_API_URL && (
					<>
						<link rel='preconnect' href={process.env.NEXT_PUBLIC_API_URL} />
						<link rel='dns-prefetch' href={process.env.NEXT_PUBLIC_API_URL} />
					</>
				)}
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
				<StoreProvider>
					<BoneyardAppShell>{children}</BoneyardAppShell>
				</StoreProvider>
			</body>
		</html>
	);
}

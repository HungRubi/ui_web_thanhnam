import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog',
	description: 'News, coupon codes, and savings tips from partner stores.',
	openGraph: {
		title: 'Blog',
		description: 'News, coupon codes, and savings tips from partner stores.',
		type: 'website',
	},
};

export default function BlogRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

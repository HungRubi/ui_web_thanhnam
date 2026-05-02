import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Search',
	description: 'Find stores, coupons, and deals.',
};

export default function SearchLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

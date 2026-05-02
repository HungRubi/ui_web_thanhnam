import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Page',
	description: 'Page content.',
};

export default function PageSlugLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}

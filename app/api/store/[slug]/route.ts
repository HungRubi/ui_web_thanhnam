import { NextRequest, NextResponse } from 'next/server';
import { getStoreDetailBySlug } from '@/lib/server/storeDetailServer';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params;
		const detail = await getStoreDetailBySlug(slug);

		if (!detail) {
			return NextResponse.json(
				{
					message: 'Store not found',
					error: `Store with slug "${slug}" not found`,
				},
				{ status: 404 }
			);
		}

		return NextResponse.json({ data: detail }, { status: 200 });
	} catch (error) {
		console.error('Error fetching store:', error);
		return NextResponse.json(
			{
				message: 'Failed to fetch store',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

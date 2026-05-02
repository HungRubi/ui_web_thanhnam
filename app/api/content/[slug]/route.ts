import { NextRequest, NextResponse } from 'next/server';
import { getEventBySlugServer } from '@/lib/server/eventServer';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
	try {
		const { slug } = await params;
		const event = await getEventBySlugServer(slug);
		if (!event) {
			return NextResponse.json({ message: 'Content not found' }, { status: 404 });
		}
		return NextResponse.json({ data: event }, { status: 200 });
	} catch (error) {
		console.error('Error in /api/content/[slug]:', error);
		return NextResponse.json({ message: 'Failed to fetch content' }, { status: 500 });
	}
}

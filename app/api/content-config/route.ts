import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export async function GET(request: NextRequest) {
	try {
		const response = await fetch(`${API_BASE_URL}/content-config`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: { revalidate: 600 },
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('API Error:', response.status, errorText);
			return NextResponse.json(
				{
					message: `API Error: ${response.status}`,
					error: errorText,
				},
				{ status: response.status }
			);
		}

		const data = await response.json();
		return NextResponse.json(data, { status: 200 });
	} catch (error) {
		console.error('Error fetching content config:', error);
		return NextResponse.json(
			{
				message: 'Failed to fetch content config',
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 500 }
		);
	}
}

import { NextResponse } from 'next/server';
import { fetchGlobalConfig } from '@/lib/api';

/** Luôn 200 + `data` đã chuẩn hóa (API lỗi vẫn có GLOBAL_CONFIG_FALLBACK). */
export async function GET() {
	const data = await fetchGlobalConfig();
	return NextResponse.json({ data }, { status: 200 });
}

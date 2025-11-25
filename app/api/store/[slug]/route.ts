import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Next.js 15+ yêu cầu await params
    const { slug } = await params;
    
    // Bước 1: Fetch danh sách stores để tìm ID từ slug
    const listResponse = await fetch(`${API_BASE_URL}/store`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error("API Error fetching stores list:", listResponse.status, errorText);
      return NextResponse.json(
        { 
          message: `API Error: ${listResponse.status}`,
          error: errorText 
        },
        { status: listResponse.status }
      );
    }

    const listResult = await listResponse.json();
    const stores = listResult.data?.storeFormat || [];
    
    // Tìm store theo slug để lấy ID
    const storeBySlug = stores.find((s: { slug: string; _id?: string }) => s.slug === slug);
    
    if (!storeBySlug || !storeBySlug._id) {
      return NextResponse.json(
        { 
          message: "Store not found",
          error: `Store with slug "${slug}" not found`
        },
        { status: 404 }
      );
    }

    // Bước 2: Dùng ID để gọi API detail từ backend
    const storeId = storeBySlug._id;
    const detailResponse = await fetch(`${API_BASE_URL}/store/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!detailResponse.ok) {
      const errorText = await detailResponse.text();
      console.error("API Error fetching store detail:", detailResponse.status, errorText);
      return NextResponse.json(
        { 
          message: `API Error: ${detailResponse.status}`,
          error: errorText 
        },
        { status: detailResponse.status }
      );
    }

    const detailResult = await detailResponse.json();
    
    // Backend trả về { data: { store: ... } }
    const store = detailResult.data?.store || detailResult.data;
    
    if (!store) {
      return NextResponse.json(
        { 
          message: "Store not found",
          error: `Store with id "${storeId}" not found`
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: store }, { status: 200 });
  } catch (error) {
    console.error("Error fetching store:", error);
    return NextResponse.json(
      { 
        message: "Failed to fetch store",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}


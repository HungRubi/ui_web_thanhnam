"use server";

import type { SeoConfig } from "@/lib/api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const getSeoConfig = async (): Promise<SeoConfig | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/seo`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.error("Failed to fetch seo config:", response.status);
      return null;
    }

    const data = await response.json();
    return data?.data || null;
  } catch (error) {
    console.error("Error fetching seo config:", error);
    return null;
  }
};




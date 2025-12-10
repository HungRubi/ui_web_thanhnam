import { MetadataRoute } from 'next';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

async function getAllStores() {
  try {
    const response = await fetch(`${API_BASE_URL}/store`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data?.storeFormat || [];
  } catch {
    return [];
  }
}

async function getAllNews() {
  try {
    const response = await fetch(`${API_BASE_URL}/new`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data?.newFormat || [];
  } catch {
    return [];
  }
}

async function getAllCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/category`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data?.categoryFormat || [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";
  
  const stores = await getAllStores();
  const news = await getAllNews();
  const categories = await getAllCategories();

  const storeEntries = (stores as Record<string, unknown>[])
    .filter((store) => (store as Record<string, unknown>).duyetbai === "Yes")
    .map((store) => {
      const s = store as Record<string, unknown>;
      return {
        url: `${baseUrl}/store/${s.slug as string}`,
        lastModified: (s.updatedAt || s.createdAt) as string | Date | undefined,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };
    });

  const newsEntries = (news as Record<string, unknown>[])
    .filter((item) => (item as Record<string, unknown>).duyet === "Yes")
    .map((item) => {
      const n = item as Record<string, unknown>;
      return {
        url: `${baseUrl}/blog/${n.slug as string}`,
        lastModified: (n.updatedAt || n.createdAt) as string | Date | undefined,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

  const categoryEntries = (categories as Record<string, unknown>[])
    .filter((cat) => (cat as Record<string, unknown>).hienthi !== false)
    .map((cat) => {
      const c = cat as Record<string, unknown>;
      return {
        url: `${baseUrl}/category/${c.slug as string}`,
        lastModified: (c.updatedAt || c.createdAt) as string | Date | undefined,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    ...storeEntries,
    ...newsEntries,
    ...categoryEntries,
  ];
}

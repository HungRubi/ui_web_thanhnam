import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

// Helper to get API base for server-side fetches
const getApiBase = () => {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, "");
  const port = process.env.PORT || 3000;
  return `http://localhost:${port}`;
};

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    // Fetch store via the API proxy to get metadata
    const base = getApiBase();
    const res = await fetch(`${base}/api/store/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    
    if (!res.ok) return { title: "Store" };
    
    const result = await res.json();
    const store = result.data?.store || result.data;
    
    if (!store) return { title: "Store" };
    
    return {
      title: store.metatitle || store.tenstore || "Store",
      description: store.metadescription || store.motangan || store.about || undefined,
      keywords: store.metakeywords || undefined,
      openGraph: {
        title: store.metatitle || store.tenstore,
        description: store.metadescription || store.motangan,
        images: store.image ? [{ url: store.image }] : undefined,
      },
    };
  } catch (error) {
    return { title: "Store" };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      {children}
    </div>
  );
}

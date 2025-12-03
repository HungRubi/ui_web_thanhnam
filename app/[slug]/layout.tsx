import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

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
    // Fetch event via the API proxy to get metadata
    const base = getApiBase();
    const res = await fetch(`${base}/api/content/${encodeURIComponent(slug)}`, {
      cache: "no-store",
    });
    
    if (!res.ok) return { title: "Event" };
    
    const result = await res.json();
    const event = result.data;
    console.log(event)
    if (!event) return { title: "Event" };
    
    return {
      title: event.metatitle || event.tendanhmuc || "Event",
      description: event.metadescription || event.mota || undefined,
      keywords: event.metakeywords || undefined,
      openGraph: {
        title: event.metatitle || event.tendanhmuc,
        description: event.metadescription || event.mota,
        images: event.image ? [{ url: event.image }] : undefined,
      },
    };
  } catch (error) {
    return { title: "Event" };
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

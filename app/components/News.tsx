"use client";

import Link from "next/link";
import NewsCard from "./NewsCard";
import { useNews } from "@/hooks/useNews";

export default function News() {
  const { news, loading, error } = useNews();
  const displayNews = news
    .filter((newsItem) => newsItem.duyet === "Yes")
    .slice(0, 5);

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (displayNews.length === 0) return <p className="text-gray-500">No articles available</p>;

  return (
    <>
      <div className="w-full flex gap-2.5 flex-wrap">
        {displayNews.map((item) => (
          <NewsCard
            key={item._id}
            title={item.name}
            img={item.image || "/news/1.jpg"}
            subTitle={item.description || ""}
            link={`/blog/${item.slug}`}
            isAuthor={true}
            formatDate={item.formatDate}
          />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <Link 
          href="/blog"
          className="inline-block border text-[#0dcaf0] border-[#0dcaf0] text-center 
          px-3 py-2 my-[50px] rounded-md hover:bg-[#0dcaf0] hover:text-white transition"
        >
          View All Article
        </Link>
      </div>
    </>
  );
}

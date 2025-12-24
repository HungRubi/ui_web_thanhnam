"use client";

import NewsCard from "../components/NewsCard";
import ListCategories from "../components/ListCategories";

type NewsItem = any;

type Props = {
  latestNews: NewsItem[];
  loading: boolean;
  error?: string | null;
};

export default function LatestNews({ latestNews, loading, error }: Props) {
  return (
    <div className="w-full mt-10">
      <div className="container mx-auto px-3">
        <h3 className="pb-2 pt-12 text-[28px] text-gray-700">Latest Post</h3>
        {loading ? (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-gray-500">Đang tải bài viết...</p>
          </div>
        ) : error ? (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-red-500">Lỗi: {error}</p>
          </div>
        ) : latestNews.length > 0 ? (
          <div className="w-full flex gap-2.5 flex-wrap">
            {latestNews.map((item: NewsItem) => (
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
        ) : (
          <div className="w-full flex items-center justify-center py-10">
            <p className="text-gray-500">Chưa có bài viết nào</p>
          </div>
        )}

        <ListCategories />
      </div>
    </div>
  );
}

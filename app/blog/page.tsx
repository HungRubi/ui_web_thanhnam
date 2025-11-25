"use client";

import Image from "next/image"
import Search from "../components/Search"
import Link from "next/link"
import NewsCard from "../components/NewsCard"
import ListCategories from "../components/ListCategories"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useNews } from "@/hooks/useNews"
import ImageWithFallback from "../components/ImageWithFallback"

// Helper function để xử lý image URL
const getImageUrl = (imagePath?: string): string => {
  if (!imagePath || imagePath.trim() === "") {
    return "/store/1.jpg";
  }
  
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    try {
      new URL(imagePath);
      return imagePath;
    } catch {
      return "/store/1.jpg";
    }
  }
  
  if (imagePath.startsWith("/upload/")) {
    return "/store/1.jpg";
  }
  
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  
  return `/${imagePath}`;
};

const Blog = () => {
    const { news, loading, error } = useNews();
    const featuredNews = news.filter(item => item.duyet === "Yes")[0];
    const latestNews = news
      .filter(item => item.duyet === "Yes")
      .slice(1);

    return (
        <>
            <Header />
            {featuredNews && (
              <div className="w-full mt-10">
                  <div className="container px-3 mx-auto relative overflow-hidden max-h-[370px] h-[370px]">
                      <ImageWithFallback
                          width={3000}
                          height={3000}
                          src={getImageUrl(featuredNews.image)}
                          alt={featuredNews.name}
                          className="w-full h-full object-cover"
                          fallback="/store/1.jpg"
                          unoptimized={getImageUrl(featuredNews.image).startsWith("http")}
                      />
                      <Link 
                          href={`/blog/${featuredNews._id}`} 
                          className="absolute text-white w-full px-10 z-10 bg-[#0000003f] min-h-32 flex items-center justify-center flex-col left-0 bottom-0"
                      >
                          <h1 className="mb-1.5 w-full line-clamp-1 text-[32px] font-[550] text-center">
                              {featuredNews.name}
                          </h1>
                          {featuredNews.description && (
                            <p className="text-[22px] w-full line-clamp-1 mb-4 text-white text-center">
                                {featuredNews.description}
                            </p>
                          )}
                      </Link>
                  </div>
              </div>
            )}
            <div className="w-full mt-10">
                <div className="container mx-auto px-3">
                    <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                        Latest Post
                    </h3>
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
                        {latestNews.map((item) => (
                          <NewsCard
                            key={item._id}
                            title={item.name}
                            img={item.image || "/news/1.jpg"}
                            subTitle={item.description || ""}
                            link={`/blog/${item._id}`}
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
                    <ListCategories/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Blog
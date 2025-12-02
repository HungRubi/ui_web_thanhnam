"use client";

import Image from "next/image"
import Link from "next/link"
import NewsCard from "../components/NewsCard"
import ListCategories from "../components/ListCategories"
import Footer from "../components/Footer"
import Header from "../components/Header"
import { useNews } from "@/hooks/useNews"
import { resolveImageUrl } from "@/utils/image";

const getImageUrl = (imagePath?: string): string =>
  resolveImageUrl(imagePath, { fallback: "/store/1.jpg" });

const Blog = () => {
    const { news, loading, error } = useNews();
    const featuredNews = news.filter(item => item.duyet === "Yes")[0];
    const featuredImageSrc = featuredNews ? getImageUrl(featuredNews.image) : "";
    const isFeaturedExternal = featuredImageSrc.startsWith("http://") || featuredImageSrc.startsWith("https://");
    const latestNews = news
      .filter(item => item.duyet === "Yes")
      .slice(1);

    return (
        <>
            <Header />
            {featuredNews && (
              <div className="w-full mt-10">
                  <div className="container px-3 mx-auto relative overflow-hidden max-h-[370px] h-[370px]">
                      <Image
                          width={3000}
                          height={3000}
                          src={featuredImageSrc}
                          alt={featuredNews.name}
                          className="w-full h-full object-cover"
                          unoptimized={isFeaturedExternal}
                      />
                      <Link 
                          href={`/blog/${featuredNews.slug}`} 
                          className="absolute text-white w-[calc(100%-24px)] ml-3 px-10 z-10 bg-[#0000003f] min-h-32 flex items-center justify-center flex-col left-0 bottom-0"
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
                    <ListCategories/>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Blog
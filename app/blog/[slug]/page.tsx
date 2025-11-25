"use client";

import Header from "@/app/components/Header"
import Link from "next/link"
import Footer from "@/app/components/Footer"
import NewsCard from "@/app/components/NewsCard"
import ImageWithFallback from "@/app/components/ImageWithFallback"
import { useNewsById, useNews } from "@/hooks/useNews"
import { useParams } from "next/navigation"

// Helper function để xử lý image URL
const getImageUrl = (imagePath?: string): string => {
  if (!imagePath || imagePath.trim() === "") {
    return "/news/1.jpg";
  }
  
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    try {
      new URL(imagePath);
      return imagePath;
    } catch {
      return "/news/1.jpg";
    }
  }
  
  if (imagePath.startsWith("/upload/")) {
    return "/news/1.jpg";
  }
  
  if (imagePath.startsWith("/")) {
    return imagePath;
  }
  
  return `/${imagePath}`;
};

const DetailNew = () => {
    const params = useParams();
    const id = params?.slug as string;
    const { news: currentNews, loading, error } = useNewsById(id);
    const { news: allNews } = useNews();
    
    // Lấy danh sách news phổ biến (loại bỏ bài hiện tại)
    const popularNews = allNews
      .filter(item => item.duyet === "Yes" && item._id !== id)
      .slice(0, 3);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Đang tải bài viết...</p>
            </div>
        );
    }

    if (error || !currentNews) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-red-500">Lỗi: {error || "Không tìm thấy bài viết"}</p>
            </div>
        );
    }

    return (
        <>
            <Header/>
            <section className="w-full mb-5">
                <div className="container mx-auto px-3 mt-12">
                    <div className="flex items-center justify-start gap-2 flex-col sm:flex-row">
                        <Link href={"/"} className="text-[#019a04]">
                            Blog
                            <span className="text-[#019a04]"> / </span>
                        </Link>
                        <Link href={"/blog"} className="text-[#019a04]">
                            {currentNews.name}
                            <span className="text-[#019a04]"> / </span>
                        </Link>
                        <span className="text-gray-500">
                            {currentNews.name}
                        </span>
                    </div>
                </div>

                <div className="container mt-4 px-3 grid grid-cols-1 md:grid-cols-4 mx-auto gap-x-4">
                    <div className="col-span-3 bg-white p-5">
                        <h1 className="mb-4 text-[28px] font-[540] text-gray-800 line-clamp-2">
                            {currentNews.name}
                        </h1>
                        <div className={`flex items-center justify-start gap-x-2.5 my-5`}>
                            <ImageWithFallback
                                width={40}
                                height={40}
                                alt="logo"
                                src={"/images/icon.png"}
                                className="w-10 h-10 object-cover"
                                fallback="/images/icon.png"
                            />
                            <p className="text-sm text-gray-400">
                                {currentNews.lastUpdate || currentNews.formatDate || "2 days ago"}
                            </p>
                        </div>
                        {currentNews.content && (
                          <div 
                            className="leading-8 text-gray-700"
                            dangerouslySetInnerHTML={{ __html: currentNews.content }}
                          />
                        )}
                        {!currentNews.content && currentNews.description && (
                          <p className="leading-8 text-gray-700">
                            {currentNews.description}
                          </p>
                        )}
                    </div>
                    <div className="col-span-1 bg-white flex flex-col gap-y-5 p-2.5">
                        <p className="mb-4 text-[24px] font-[540] text-gray-800 line-clamp-2 p-2.5 ">
                            Popular Blog
                        </p>
                        {popularNews.map((item) => (
                          <NewsCard
                            key={item._id}
                            title={item.name}
                            img={item.image || "/news/1.jpg"}
                            subTitle={item.description || ""}
                            link={`/blog/${item._id}`}
                            isAuthor={false}
                            className="w-full! border-none! shadow-none!"
                            isSub="hidden"
                            formatDate={item.formatDate}
                          />
                        ))}
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default DetailNew
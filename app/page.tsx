"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

import ProductCard from "./components/ProductCard";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Search from "./components/Search";
import ListCategories from "./components/ListCategories";
import { useStores } from "@/hooks/useStores";
import { useNews } from "@/hooks/useNews";
import { useDeals } from "@/hooks/useDeals";
import { useWidgets } from "@/hooks/useWidgets";
import { resolveImageUrl } from "@/utils/image";
import { useGlobalConfig } from "@/hooks/useGlobalConfig";

export default function Home() {
  const storeSwiperRef = useRef<SwiperType | null>(null);
  const { stores: apiStores, loading: storesLoading } = useStores();
  const { news: apiNews, loading: newsLoading, error: newsError } = useNews();
  const { deals: apiDeals, loading: dealsLoading, error: dealsError } = useDeals();
  const { widgets, loading: widgetsLoading } = useWidgets();
  const { data } = useGlobalConfig();

  const slides = widgets
    .filter(w => w.hienthi === "Yes")
    .sort((a, b) => (a.stt || 99999) - (b.stt || 99999))
    .map(w => ({
      src: resolveImageUrl(w.image, { fallback: "/slides/1.png" }),
      alt: w.name,
      href: w.link || "/",
      description: w.description,
    }))
    .length > 0
    ? widgets
        .filter(w => w.hienthi === "Yes")
        .sort((a, b) => (a.stt || 99999) - (b.stt || 99999))
        .map(w => ({
          src: resolveImageUrl(w.image, { fallback: "/slides/1.png" }),
          alt: w.name,
          href: w.link || "/",
          description: w.description,
        })) : []
  const getImageUrl = (imagePath?: string, fallback: string = "/store/1.jpg"): string =>
  resolveImageUrl(imagePath, { fallback });
  const handleDealClick = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const displayStores = apiStores
    .filter(store => store.duyetbai === "Yes")
    .sort((a, b) => (a.stt || 999) - (b.stt || 999))
    .map(store => ({
      name: store.tenstore,
      img: getImageUrl(store.image),
      slug: store.slug,
    }));
  const displayNews = apiNews
    .filter(newsItem => newsItem.duyet === "Yes")
    .slice(0, 6);
  const displayDeals = apiDeals
    .filter((deal) => deal.duyet === "Yes")
    .slice(0, 6);
  return (
    <>
      <nav className="pt-2! relative flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="w-full flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.logo}`}
              alt={data?.nameCompany || "Store"}
              width={300}
              height={170}
              className="max-w-[400px] w-full h-auto object-contain"
            />
            <p className="text-[12px] font-medium">
              {data?.slogan}
            </p>
          </div>

          <div className="py-12 w-full">
            <Search />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 mt-5">
        <div className="w-full text-center">
          <p className="font-bold text-xl mb-5 leading-1 max-[500px]:leading-normal text-gray-700 md:text-3xl sm:text-2xl xl:text-[35px]">
            Shop Now With Thousands Of Discount Codes
          </p>
          <p className="font-bold text-base leading-none text-gray-700">
            Huge savings with a completely free discount code constantly updated, over the world
          </p>
        </div>

        <div className="w-full mt-6">
          <Swiper
            modules={[Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={idx}>
                <Link href={slide.href} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    width={3000}
                    height={1500}
                    className="w-full h-auto object-contain pb-10"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full mt-5">
          <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
            Popular Store
          </h3>
          <div className="w-full">
            <Swiper
              modules={[Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={7}
              breakpoints={{
                320: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 4 },
                1024: { slidesPerView: 5 },
                1280: { slidesPerView: 6 },
                1536: { slidesPerView: 7 },
              }}
              pagination={{ clickable: true }}
              loop={false}
              style={{ padding: "20px 0" }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSwiper={(swiper) => (storeSwiperRef.current = swiper)}
              onSlideChange={() => {
                const s = storeSwiperRef.current;
                if (!s) return;
                const autoplay = s.params.autoplay;
                if (autoplay && typeof autoplay === "object") {
                  if (s.isEnd) {
                    autoplay.reverseDirection = true;
                  } else if (s.isBeginning) {
                    autoplay.reverseDirection = false;
                  }
                }
              }}
            >
              {storesLoading ? (
                <SwiperSlide>
                  <div className="flex items-center justify-center h-32">
                    <p className="text-gray-500">Đang tải...</p>
                  </div>
                </SwiperSlide>
              ) : displayStores.length > 0 ? (
                displayStores.slice(0, 13).map((item, index) => {
                  const isExternalImage = item.img.startsWith("http://") || item.img.startsWith("https://");
                  return (
                    <SwiperSlide key={index}>
                      <Link 
                        href={`/store/${item.slug}`} 
                        style={{ textAlign: "center" }}
                        className="overflow-hidden"
                      >
                        <Image
                          src={item.img}
                          alt={item.name || "Store"}
                          width={200}
                          height={200}
                          className="w-full h-auto object-contain min-w-45"
                          unoptimized={isExternalImage}
                        />
                        <div className="w-full text-center">
                          <p className="my-2.5 truncate">{item.name}</p>
                        </div>
                      </Link>
                    </SwiperSlide>
                  );
                })
              ) : (
                <SwiperSlide>
                  <div className="flex items-center justify-center h-32">
                    <p className="text-gray-500">Chưa có store nào</p>
                  </div>
                </SwiperSlide>
              )}
            </Swiper>
          </div>
        </div>

        <div className="w-full mt-5">
          <h3 className="pb-2 pt-12 text-[28px]">
            Deals Of Today
            <Link 
              href={"#"}
              className="text-green-500 float-right text-[28px]"
            >
              Deals
            </Link>
          </h3>
          {dealsLoading ? (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-gray-500">Đang tải deal...</p>
            </div>
          ) : dealsError ? (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-red-500">Lỗi: {dealsError}</p>
            </div>
          ) : displayDeals.length > 0 ? (
            <div className="w-full flex flex-wrap gap-2.5">
              {displayDeals.map((deal) => (
                <ProductCard
                  key={deal._id}
                  title={deal.name}
                  img={getImageUrl(deal.image, "/products/1.png")}
                  oldPrice={deal.originalPrice}
                  newPrice={deal.price || 0}
                  onDeal={() => handleDealClick(deal.url)}
                  disabled={!deal.url}
                />
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-gray-500">Chưa có deal nào</p>
            </div>
          )}
        </div>

        <div className="w-full mt-5">
          <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
            Feature Post
          </h3>
          {newsLoading ? (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-gray-500">Đang tải bài viết...</p>
            </div>
          ) : newsError ? (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-red-500">Lỗi: {newsError}</p>
            </div>
          ) : displayNews.length > 0 ? (
            <>
              <div className="w-full flex gap-2.5 flex-wrap">
                {displayNews.slice(0, 5).map((item) => (
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
          ) : (
            <div className="w-full flex items-center justify-center py-10">
              <p className="text-gray-500">Chưa có bài viết nào</p>
            </div>
          )}
        </div>

        <ListCategories />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}

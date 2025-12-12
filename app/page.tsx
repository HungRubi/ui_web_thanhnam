"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";

import Footer from "./components/Footer";
import Deals from "./components/Deal";
import News from "./components/News";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Search from "./components/Search";
import ListCategories from "./components/ListCategories";
import { useStores } from "@/hooks/useStores";
import { useWidgets } from "@/hooks/useWidgets";
import { resolveImageUrl } from "@/utils/image";
import { useGlobalConfig } from "@/hooks/useGlobalConfig";

export default function Home() {
  const storeSwiperRef = useRef<SwiperType | null>(null);
  const { stores: apiStores, loading: storesLoading } = useStores();
  const { widgets } = useWidgets();
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

  const displayStores = apiStores
    .filter(store => store.duyetbai === "Yes")
    .sort((a, b) => (a.stt || 999) - (b.stt || 999))
    .map(store => ({
      name: store.tenstore,
      img: getImageUrl(store.image),
      slug: store.slug,
    }));
  return (
    <>
      <nav className="pt-2! relative flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="w-full flex flex-col items-center">
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.logo}` || "images/logo.jpg"}
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
                    src={slide.src || "/slides/1.png"}
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
                          src={item.img || "/store/1.jpg"}
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
          <Deals />
        </div>

        <div className="w-full mt-5">
          <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
            Feature Post
          </h3>
          <News />
        </div>

        <ListCategories />
      </div>

      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}

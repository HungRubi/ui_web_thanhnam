"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";
import { useStores } from "@/hooks/useStores";
import { resolveImageUrl } from "@/utils/image";

export default function HomeStores() {
  const storeSwiperRef = useRef<SwiperType | null>(null);
  const { stores: apiStores, loading: storesLoading } = useStores();

  const getImageUrl = (imagePath?: string, fallback: string = "/store/1.jpg") =>
    resolveImageUrl(imagePath, { fallback });

  const displayStores = apiStores
    .filter((store) => store.duyetbai === "Yes")
    .sort((a, b) => (a.stt || 999) - (b.stt || 999))
    .map((store) => ({
      name: store.tenstore,
      img: getImageUrl(store.image),
      slug: store.slug,
    }));

  return (
    <div className="w-full mt-5">
      <h3 className="pb-2 pt-12 text-[28px] text-gray-700">Popular Store</h3>
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
                  <Link href={`/store/${item.slug}`} style={{ textAlign: "center" }} className="overflow-hidden">
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
  );
}

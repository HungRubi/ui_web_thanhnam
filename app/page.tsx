"use client";

import Image from "next/image";
import { useRef } from "react";
import icons from "@/utils/icons";
const  { FiSearch } = icons;
import Link from "next/link";

import ProductCard from "./components/ProductCard";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
import Search from "./components/Search";
import ListCategories from "./components/ListCategories";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storeSwiperRef = useRef<any>(null);
  const slides = [
    {
      src: "/slides/1.png",
      alt: "Superstratum Labs",
      href: "https://superstratumlabs.com/?ref=NAMNGUYENTHANH",
    },
    {
      src: "/slides/2.png",
      alt: "ATK",
      href: "https://www.atk.store/?ref=NAMNGUYENTHANH",
    },
    {
      src: "/slides/3.png",
      alt: "Sunwayfoto",
      href: "https://sunwayfoto.com/?ref=nicczswj",
    },
    {
      src: "/slides/4.png",
      alt: "Dasaita",
      href: "https://www.dasaita.com/?ref=zwcfddde",
    },
    {
      src: "/slides/5.png",
      alt: "Yeswelder",
      href: "https://yeswelder.com/?ref=vytbxsvm",
    }
  ];
  const stores = [
  { name: "Simsonn", img: "/store/1.jpg" },
  { name: "Shine Of Diamond", img: "/store/2.jpg" },
  { name: "ATK", img: "/store/3.png" },
  { name: "Superstratum Labs", img: "/store/4.jpg" },
  { name: "FreeBoy", img: "/store/5.jpg" },
  { name: "Retevis", img: "/store/6.jpg" },
  { name: "Nogy", img: "/store/8.jpg" },
  { name: "Nogy", img: "/store/9.png" },
  { name: "Nogy", img: "/store/10.jpg" },
  { name: "Nogy", img: "/store/11.jpg" },
  { name: "Nogy", img: "/store/12.png" },
  { name: "Nogy", img: "/store/13.jpg" },
  { name: "Nogy", img: "/store/14.jpg" },
  { name: "Nogy", img: "/store/16.jpg" },
  { name: "Nogy", img: "/store/15.png" },
];
  return (
    <>
      <nav className="pt-2! relative flex items-center justify-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
          <div className="w-full flex flex-col items-center">
            <Image
              src="/images/logo.jpg"
              alt="test"
              width={423}
              height={Math.round(423 * 0.75)}
              className="max-w-[423px] w-full"
            />
            <p className="text-[12px] font-medium">
              Slogan-Thành Nam Store
            </p>
          </div>

          <div className="py-12 w-full">
            <Search />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-3 mt-5">
        <div className="w-full text-center">
          <p className="font-bold text-[34px] mb-5 leading-1 text-gray-700">
            Shop Now With Thousands Of Discount Codes
          </p>
          <p className="font-bold text-base leading-none text-gray-700">
            Shop Now With Thousands Of Discount Codes
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
              pagination={{ clickable: true }}
              loop={false}
              style={{ padding: "20px 0" }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSwiper={(swiper) => (storeSwiperRef.current = swiper)}
              onSlideChange={() => {
                const s = storeSwiperRef.current;
                if (!s) return;
                if (s.isEnd) s.params.autoplay.reverseDirection = true;
                else if (s.isBeginning) s.params.autoplay.reverseDirection = false;
              }}
            >
              {stores.map((item, index) => (
                <SwiperSlide key={index}>
                <Link href={"/store/test"} style={{ textAlign: "center" }}>
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={10000}
                    height={10000}
                  />
                  <p className="my-2.5">{item.name}</p>
                </Link>
              </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        <div className="w-full mt-5">
          <h3 className="pb-2 pt-12 text-[28px]">
            Popular Store
            <Link 
              href={"#"}
              className="text-green-500 float-right text-[28px]"
            >
              Deals
            </Link>
          </h3>
          <div className="w-full flex items-center gap-2.5">
            <ProductCard
              title="Firstess DP200 Multi-Process DualPulse™ MIG Welder"
              img="/products/1.png"
              oldPrice={699}
              newPrice={399}
            />
            <ProductCard
              title="Firstess DP200 Multi-Process DualPulse™ MIG Welder"
              img="/products/1.png"
              oldPrice={699}
              newPrice={399}
            />
            <ProductCard
              title="Firstess DP200 Multi-Process DualPulse™ MIG Welder"
              img="/products/1.png"
              oldPrice={699}
              newPrice={399}
            />
            <ProductCard
              title="Firstess DP200 Multi-Process DualPulse™ MIG Welder"
              img="/products/1.png"
              oldPrice={699}
              newPrice={399}
            />
            <ProductCard
              title="Firstess DP200 Multi-Process DualPulse™ MIG Welder"
              img="/products/1.png"
              oldPrice={699}
              newPrice={399}
            />
            <ProductCard
              title="Firstess DP200 Multi-Process DualPulse™ MIG Welder"
              img="/products/1.png"
              oldPrice={699}
              newPrice={399}
            />
          </div>
        </div>

        <div className="w-full mt-5">
          <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
            Feature Post
          </h3>
          <div className="w-full flex gap-2.5">
            <NewsCard
              title="Shine of Diamond - The Epitome of Modern Luxury Jewelry Art"
              img="/news/1.jpg"
              subTitle="Discover Shine of Diamond – a luxury jewelry brand offering exquisite craftsmanship that celebrates elegance, sophistication, and individuality for the modern woman."
              link="/blog/test"
              isAuthor={false}
            />
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
        </div>

        <ListCategories />
      </div>
      
      <div className="w-full">
        <Footer />
      </div>
    </>
  );
}

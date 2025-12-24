"use client";

import Image from "next/image";
import Link from "next/link";

import Footer from "./components/Footer";
import Deals from "./components/Deal";
import News from "./components/News";
import Search from "./components/Search";
import ListCategories from "./components/ListCategories";
import HomeSlides from "./components/HomeSlides";
import HomeStores from "./components/HomeStores";
import { useGlobalConfig } from "@/hooks/useGlobalConfig";

export default function Home() {
  const { data } = useGlobalConfig();
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

        <HomeSlides />

        <HomeStores />

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

"use client";

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { resolveImageUrl } from "@/utils/image";
import { useGlobalConfig } from "@/hooks/useGlobalConfig";

type NewsCardProps = {
  title: string;
  img: string;
  subTitle: string;
  link: string;
  isAuthor: boolean;
  className?: string;
  isSub?: string;
  formatDate?: string;
};

const NewsCard: FC<NewsCardProps> = ({
  title, 
  img, 
  subTitle, 
  link, 
  isAuthor, 
  className, 
  isSub,
  formatDate
}) => {
    const imageSrc = resolveImageUrl(img, { fallback: "/news/1.jpg" });
    const isExternalImage = imageSrc.startsWith("http://") || imageSrc.startsWith("https://");

    const { data } = useGlobalConfig();
    
    return (
      <div className={`border border-gray-200 rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition 
      w-[calc(100%/5-8px)] relative ${className} max-[450px]:w-full  max-[650px]:w-[calc(100%/2-7px)] max-[900px]:w-[calc(100%/3-7px)]`}>
        <Link 
          href={link}
          className="w-full h-[180px] flex items-center justify-center mb-3"
        >
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={300}
            className="object-contain max-h-full"
            unoptimized={isExternalImage}
          />
        </Link>
        <div className={`flex items-center justify-start gap-x-2.5 ${isAuthor ? "block" : "hidden"}`}>
          <Image
            width={40}
            height={40}
            alt="logo"
            src={`${process.env.NEXT_PUBLIC_API_URL}/${data?.favicon}` || '/images/icon.png'}
            className="w-10 h-10 object-cover"
          />
          <p className="text-sm text-gray-400">{formatDate || "2 days ago"}</p>
        </div>
        <Link 
          href={link}
          className="font-[560] text-gray-800 text-[15px] leading-tight line-clamp-3 mb-2"
        >
          {title}
        </Link>
        <p className={`font-normal text-gray-600 text-sm leading-5 line-clamp-3 mb-2 ${isSub}`}>
          {subTitle}
        </p>
        <div className={`w-9/10 mx-auto mt-5 border-t border-gray-300 ${isAuthor ? "hidden" : "block"} ${isSub}`}></div>
        <Link
          href={link}
          className={`w-full flex justify-center py-2 text-gray-700 hover:bg-gray-100 transition ${isAuthor ? "hidden" : "block"} ${isSub}`}
        >
          Continue Reading
        </Link>
      </div>
    )
}

export default NewsCard
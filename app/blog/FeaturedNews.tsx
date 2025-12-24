"use client";

import Image from "next/image";
import Link from "next/link";
import { resolveImageUrl } from "@/utils/image";

type NewsItem = any;

type Props = {
  featuredNews: NewsItem;
};

const getImageUrl = (imagePath?: string) => resolveImageUrl(imagePath, { fallback: "/store/1.jpg" });

export default function FeaturedNews({ featuredNews }: Props) {
  const featuredImageSrc = featuredNews ? getImageUrl(featuredNews.image) : "";
  const isFeaturedExternal = featuredImageSrc.startsWith("http://") || featuredImageSrc.startsWith("https://");

  return (
    <div className="w-full mt-10">
      <div className="container px-3 mx-auto relative overflow-hidden max-h-[370px] h-[370px]">
        <Image
          width={3000}
          height={3000}
          src={featuredImageSrc || "/news/1.jpg"}
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
  );
}

import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

type NewsCardProps = {
  title: string;
  img: string;
  subTitle: string;
  link: string;
  isAuthor: boolean
  className?: string,
  isSub?: string
};

const NewsCard: FC<NewsCardProps> = ({title, img, subTitle, link, isAuthor, className, isSub}) => {
    return (
      <div className={`border border-gray-200 rounded-lg px-3 bg-white shadow-sm hover:shadow-md transition 
      w-[calc(100%/6-6px)] relative ${className}`}>
        <Link 
          href={link}
          className="w-full h-[180px] flex items-center justify-center mb-3"
        >
          <Image
            src={img}
            alt={title}
            width={300}
            height={300}
            className="object-contain max-h-full"
          />
        </Link>
        <div className={`flex items-center justify-start gap-x-2.5 ${isAuthor ? "block" : "hidden"}`}>
          <Image
            width={300}
            height={300}
            alt="logo"
            src={"/images/icon.png"}
            className="w-10 h-10 object-cover"
          />
          <p className="text-sm text-gray-400">2 days ago</p>
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
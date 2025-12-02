import Image from "next/image";
import { FC } from "react";
import icons from "@/utils/icons";
import { resolveImageUrl } from "@/utils/image";
const {FaHeart} = icons

type ProductCardProps = {
  title: string;
  img: string;
  oldPrice?: number;
  newPrice: number;
  onDeal?: () => void;
  disabled?: boolean;
};

const ProductCard: FC<ProductCardProps> = ({title, img, oldPrice, newPrice, onDeal, disabled = false}) => {
  const imageSrc = resolveImageUrl(img, { fallback: "/products/1.png" });
  const isExternalImage = imageSrc.startsWith("http://") || imageSrc.startsWith("https://");
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition w-[calc(100%/6-6px)] relative">
      <div className="absolute left-2 top-2 text-red-500 text-xl">
        ⚡
      </div>
      <div className="w-full h-[180px] flex items-center justify-center mb-3">
        <Image
          src={imageSrc}
          alt={title}
          width={300}
          height={300}
          className="object-contain max-h-full"
          unoptimized={isExternalImage}
        />
      </div>
      <p className="font-medium text-gray-800 text-[15px] leading-tight line-clamp-4 mb-2">
        {title}
      </p>
      <div className="flex items-center gap-2 mb-3 justify-between">
        <div>
            {oldPrice && (
            <span className="text-red-500 line-through mr-2">${oldPrice}</span>
            )}
            <span className="text-green-600 font-semibold">${newPrice}</span>
        </div>
        <FaHeart className="text-gray-500 hover:text-red-500"/>
      </div>
      <button
        className={`w-full border rounded-md py-2 text-gray-700 transition ${
          disabled || !onDeal ? "cursor-not-allowed opacity-70" : "hover:bg-gray-100"
        }`}
        onClick={onDeal}
        disabled={disabled || !onDeal}
      >
        Get Deal
      </button>
    </div>
  );
};

export default ProductCard;

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
    <div className="border border-gray-200 rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition
                w-[calc(100%/6-9px)] relative flex flex-col max-[450px]:w-full max-[650px]:w-[calc(100%/2-7px)] max-[900px]:w-[calc(100%/3-7px)]
                max-[1380px]:w-[calc(100%/5-8px)]">
      
      <div className="absolute left-2 top-2 text-red-500 text-xl">⚡</div>

      {/* CONTENT */}
      <div className="flex-1">
        <div
          className="w-full h-[180px] flex items-center justify-center mb-3 cursor-pointer"
          onClick={onDeal}
        >
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={300}
            className="object-contain max-h-full"
            unoptimized={isExternalImage}
          />
        </div>

        <p
          className="font-medium text-gray-800 text-[15px] leading-tight line-clamp-3 mb-2 cursor-pointer"
          onClick={onDeal}
        >
          {title}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div>
            {oldPrice && (
              <span className="text-red-500 line-through mr-2">${oldPrice}</span>
            )}
            <span className="text-green-600 font-semibold">${newPrice}</span>
          </div>
          <FaHeart className="text-gray-500 hover:text-red-500" />
        </div>
      </div>

      {/* BUTTON */}
      <button
        className={`mt-auto w-full border rounded-md py-2 text-gray-700 transition ${
          disabled || !onDeal
            ? "cursor-not-allowed opacity-70"
            : "hover:bg-gray-100"
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

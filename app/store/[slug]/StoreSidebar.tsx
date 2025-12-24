"use client";

import Image from "next/image";
import ModalCoupon from "@/app/components/ModalCoupon";
import icons from "@/utils/icons";

const { FaStar } = icons;

type Props = {
  store: any;
  offers: any[];
};

export default function StoreSidebar({ store, offers }: Props) {
  const storeImageSrc = store ? (store.image || "/store/1.jpg") : "/store/1.jpg";
  const isExternalImage = storeImageSrc.startsWith("http://") || storeImageSrc.startsWith("https://");

  return (
    <div className="col-span-1 max-[435px]:mb-5 max-[435px]:mx-auto max-[435px]:w-full max-[435px]:col-span-full">
      <div className="w-full flex items-center justify-center bg-white flex-col shadow">
        <div className="h-[150px]">
          <Image src={storeImageSrc} alt={store?.tenstore} width={300} height={300} className="h-full object-cover w-auto" unoptimized={isExternalImage} />
        </div>
        <ModalCoupon btn={2} offers={offers} store={store} />
        <div className="flex items-center justify-center gap-1.5 mt-2">
          <FaStar className="text-yellow-500 text-xl" />
          <FaStar className="text-yellow-500 text-xl" />
          <FaStar className="text-yellow-500 text-xl" />
          <FaStar className="text-yellow-500 text-xl" />
          <FaStar className="text-yellow-500 text-xl" />
        </div>
        <p className="mt-2 text-gray-600 text-sm">5.0  /  25 votes</p>
        <div className="bg-amber-50 px-2.5 py-1 my-2">
          <p className="text-amber-400">Rate it</p>
        </div>
        <ModalCoupon btn={0} offers={offers} store={store} />
      </div>
      <div className="bg-white mt-2.5 p-4 text-sm text-gray-700 shadow">
        <p className="font-bold line-clamp-2 mb-3">{offers.length} Coupons, {offers.length} Verified Coupons</p>
        <div className="w-full flex items-center justify-between mb-2">
          <p>Coupon Codes</p>
          <p>{offers.length}</p>
        </div>
        <div className="w-full flex items-center justify-between mb-2">
          <p>Deal</p>
          <p>0</p>
        </div>
        <div className="w-full flex items-center justify-between mb-2">
          <p>Best Offer</p>
          <p>35% off</p>
        </div>
      </div>
    </div>
  );
}

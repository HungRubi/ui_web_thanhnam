"use client";
import Image from "next/image"
import Link from "next/link";
import Search from "../../components/Search"
import icons from "@/utils/icons";
import Footer from "@/app/components/Footer";
import ModalCoupon from "@/app/components/ModalCoupon";
import { useStoreBySlug } from "@/hooks/useStores";
import { useParams } from "next/navigation";
import { resolveImageUrl } from "@/utils/image";
const {FaStar} = icons

// Helper function để xử lý và validate image URL
const getImageUrl = (imagePath?: string): string => {
  return resolveImageUrl(imagePath, { fallback: "/store/1.jpg" });
};
export default function Store () {
    const params = useParams();
    const slug = params?.slug as string;
    const { store, loading, error } = useStoreBySlug(slug);

    if (loading) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Đang tải thông tin store...</p>
            </div>
        );
    }

    if (error || !store) {
        return (
            <div className="w-full min-h-screen flex items-center justify-center">
                <p className="text-red-500">Lỗi: {error || "Không tìm thấy store"}</p>
            </div>
        );
    }
    const storeImageSrc = getImageUrl(store.image);
    const isExternalImage = storeImageSrc.startsWith("http://") || storeImageSrc.startsWith("https://");
    return (
        <>
            <nav className="w-full py-2">
                <div className="container px-3 mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <div className="col-span-1 mx-auto">
                        <Image
                        src="/images/logo.jpg"
                        alt="test"
                        width={300}
                        height={250}
                        className="h-[65px] object-cover"
                        />
                    </div>
                    <div className="col-span-3">
                        <Search />
                    </div>
                </div>
            </nav>
            <div className="w-full">
                <div className="container px-3 mx-auto mt-12 grid grid-cols-1 sm:grid-cols-4 gap-x-7">
                    <div className="col-span-1">
                        <div className="w-full flex items-center justify-center bg-white flex-col shadow">
                            <div className="h-[150px]">
                                <Image
                                    src={storeImageSrc}
                                    alt={store.tenstore}
                                    width={300}
                                    height={300}
                                    className="h-full object-cover w-auto"
                                    unoptimized={isExternalImage}
                                />
                            </div>
                            <Link 
                                href={`/store/${store.slug}`}
                                className="text-[#019a04]"
                            >
                                {store.tenstore}
                            </Link>
                            <div className="flex items-center justify-center gap-1.5 mt-2">
                                <FaStar className="text-yellow-500 text-xl"/>
                                <FaStar className="text-yellow-500 text-xl"/>
                                <FaStar className="text-yellow-500 text-xl"/>
                                <FaStar className="text-yellow-500 text-xl"/>
                                <FaStar className="text-yellow-500 text-xl"/>
                            </div>
                            <p className="mt-2 text-gray-600 text-sm">5.0  /  25 votes</p>
                            <div className="bg-amber-50 px-2.5 py-1 my-2">
                                <p className="text-amber-400">Rate it</p>
                            </div>
                            <ModalCoupon btn={true}/>
                        </div>
                        <div className="bg-white mt-2.5 p-4 text-sm text-gray-700 shadow">
                            <p className="font-bold line-clamp-2 mb-3">
                                3 Coupons, 3 Verified Coupons
                            </p>
                            <div className="w-full flex items-center justify-between mb-2">
                                <p>Coupon Codes</p>
                                <p>3</p>
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
                    <div className="col-span-3">
                        <h3 className="text-[28px] font-semibold pb-3 leading-7 w-full text-gray-700">
                            {store.tenstore} Coupons and Promo Codes
                        </h3>
                        {store.motangan && (
                            <div className="mb-6 line-clamp-2 tracking-wide">
                                {store.motangan}
                            </div>
                        )}

                        <div className="mb-2 w-full flex items-center gap-x-2.5">
                            <div className="bg-white text-[#019a04] px-6 py-2 rounded-md font-bold shadow
                                            hover:bg-[#019a04] hover:text-white transition">
                                All (3)
                            </div>
                            <div className="bg-white text-[#019a04] px-6 py-2 rounded-md font-bold shadow
                                            hover:bg-[#019a04] hover:text-white transition">
                                Verified (3)
                            </div>
                            <div className="bg-white text-[#019a04] px-6 py-2 rounded-md font-bold shadow
                                            hover:bg-[#019a04] hover:text-white transition">
                                Code (3)
                            </div>
                            <div className="bg-white text-[#019a04] px-6 py-2 rounded-md font-bold shadow
                                            hover:bg-[#019a04] hover:text-white transition">
                                Deal (3)
                            </div>
                        </div>

                        <div className="w-full bg-white flex p-2.5 min-h-[130px] items-center mb-4 shadow rounded">
                            <div 
                                className="w-[110px] flex-none h-[130px] flex items-center border-r border-dashed" 
                                style={{ borderColor: "#e7e7e7" }}
                            >
                                <p className="text-[22px] font-black text-[#019a04]">25% Off</p>
                            </div>
                            <div className="w-full flex flex-col justify-start h-[130px] ml-2.5">
                                <p className="text-[#019a04] font-bold">
                                    Verified Code
                                </p>
                                <h2 className="text-xl font-bold text-gray-700 my-4">
                                    <Link href={""}>
                                        Up to $25 Off Site-wide
                                    </Link>
                                </h2>
                                <p className="min-w-9/10 text-sm text-gray-600 tracking-wide">
                                    Spend much less on your dream items when you shop at Amyet. 
                                    Grab the garbain before it&apos;s gone.
                                </p>
                            </div>
                            <div className="w-[235px] flex-none flex justify-center">
                                <ModalCoupon btn={false} />
                            </div>
                        </div>

                        <div className="w-full bg-white flex p-2.5 min-h-[130px] items-center mb-4 shadow rounded">
                            <div 
                                className="w-[110px] flex-none h-[130px] flex items-center border-r border-dashed" 
                                style={{ borderColor: "#e7e7e7" }}
                            >
                                <p className="text-[22px] font-black text-[#019a04]">35% Off</p>
                            </div>
                            <div className="w-full flex flex-col justify-start h-[130px] ml-2.5">
                                <p className="text-[#019a04] font-bold">
                                    Verified Code
                                </p>
                                <h2 className="text-xl font-bold text-gray-700 my-4">
                                    <Link href={""}>
                                        Up to 35% Off Site-wide
                                    </Link>
                                </h2>
                                <p className="min-w-9/10 text-sm text-gray-600 tracking-wide">
                                    Spend much less on your dream items when you shop at Amyet. 
                                    Grab the garbain before it&apos;s gone.
                                </p>
                            </div>
                            <div className="w-[235px] flex-none flex justify-center">
                                <ModalCoupon btn={false} />
                            </div>
                        </div>

                        {store.about && (
                            <>
                                <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">
                                    About store
                                </h2>
                                <div className="w-full border border-gray-200 p-4 text-[#555]">
                                    <div 
                                        className="mb-4 leading-7"
                                        dangerouslySetInnerHTML={{ __html: store.about }}
                                    />
                                </div>
                            </>
                        )}

                        {store.howtoapply && (
                            <>
                                <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">
                                    How to apply {store.tenstore} coupon codes
                                </h2>
                                <div className="w-full border border-gray-200 p-4 text-[#555]">
                                    <div 
                                        className="mb-4 leading-7"
                                        dangerouslySetInnerHTML={{ __html: store.howtoapply }}
                                    />
                                </div>
                            </>
                        )}

                        {store.faqs && (
                            <>
                                <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">
                                    {store.tenstore} Questions & Answers
                                </h2>
                                <div className="w-full border border-gray-200 p-4 text-[#555]">
                                    <div 
                                        className="leading-7"
                                        dangerouslySetInnerHTML={{ __html: store.faqs }}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full mt-5 mb-10">
                <div className="container mx-auto px-3">
                    <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                        Popular Brands
                    </h3>
                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 text-[#019a04]">
                        <div className="col-span-1 flex flex-col">
                            <Link href={""}>
                                ATK 
                            </Link>
                            <Link href={""}>
                                FreeBoy 
                            </Link>
                            <Link href={""}>
                                Retevis 
                            </Link>
                            <Link href={""}>
                                Superstratum Labs 
                            </Link>
                            <Link href={""}>
                                Nogy 
                            </Link>
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <Link href={""}>
                                ATK 
                            </Link>
                            <Link href={""}>
                                FreeBoy 
                            </Link>
                            <Link href={""}>
                                Retevis 
                            </Link>
                            <Link href={""}>
                                Superstratum Labs 
                            </Link>
                            <Link href={""}>
                                Nogy 
                            </Link>
                        </div>
                        <div className="col-span-1 flex flex-col">
                            <Link href={""}>
                                ATK 
                            </Link>
                            <Link href={""}>
                                FreeBoy 
                            </Link>
                            <Link href={""}>
                                Retevis 
                            </Link>
                            <Link href={""}>
                                Superstratum Labs 
                            </Link>
                            <Link href={""}>
                                Nogy 
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}
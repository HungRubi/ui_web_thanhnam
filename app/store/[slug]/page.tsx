"use client";
import Image from "next/image"
import Link from "next/link";
import Search from "../../components/Search"
import icons from "@/utils/icons";
import Footer from "@/app/components/Footer";
import ModalCoupon from "@/app/components/ModalCoupon";
import { Modal } from "@mui/material";
const {FaStar} = icons
export default function Store () {
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
                                    src={"/store/1.jpg"}
                                    width={300}
                                    height={300}
                                    alt="Store"
                                    className="h-full object-cover w-auto"
                                />
                            </div>
                            <Link 
                                href={""}
                                className="text-[#019a04]"
                            >
                                Amyet
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
                            Amyet Coupons and Promo Codes
                        </h3>
                        <div className="mb-6 line-clamp-2 tracking-wide">
                            Enjoy incredible discounts from Amyet on all your favorite items. For a limited time only.
                        </div>

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

                        <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">
                            About store
                        </h2>
                        <div className="w-full border border-gray-200 p-4 text-[#555]">
                            <p className="mb-4 leading-7">
                                About Us <br />
                                AmYet is a brand founded in 2023 that focuses on designing, manufacturing, 
                                and selling high‑quality electric bikes. The company aims to combine performance, 
                                innovation, and value, helping riders embrace mobility and sustainable travel. 
                                With a commitment to quality and user experience, 
                                AmYet builds electric bikes that cater to both daily commute and adventure alike.
                            </p>
                        </div>

                        <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">
                            How to apply Amyet coupon codes
                        </h2>
                        <div className="w-full border border-gray-200 p-4 text-[#555]">
                            <p className="mb-4 leading-7">
                                How to apply Amyet coupon codes? <br />
                                Step 1: Find your Amyet Coupons, discount codes on this page or Zibjr and click &quot;GET CODE&quot; 
                                button to view the code, then click &quot;Copy&quot; and the coupons, discount codes will be copied to your 
                                phone&quot;s or computer&quot;s clipboard. <br />
                                Step 2: Go to Amyet then select all items you want to buy and add to shopping cart. When finished 
                                shopping, go to the Amyet checkout page. <br />
                                Step 3: During checkout, find the text &quot;Promo Code&quot; or &quot;Discount Code&quot; and 
                                paste your Amyet coupons, discount codes in step 1 to this box. Click &quot;Apply&quot; and your savings 
                                for Amyet will be applied.
                            </p>
                        </div>

                        <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">
                            Amyet Questions & Answers
                        </h2>
                        <div className="w-full border border-gray-200 p-4 text-[#555]">
                            <p className="leading-7">
                                Q: Why should I visit Zibjr for Amyet coupons? <br />
                                A: Zibjr collects the top discounts from Amyet, even at the last minute 
                                while updating continually to ensure consumer savings. Coupons, promo codes, 
                                gift cards and many more can also be found on the website.
                            </p>
                        </div>
                        <div className="w-full border border-gray-200 p-4 text-[#555] border-t-0">
                            <p className="leading-7">
                                Q: Why should I visit Zibjr for Amyet coupons? <br />
                                A: Zibjr collects the top discounts from Amyet, even at the last minute 
                                while updating continually to ensure consumer savings. Coupons, promo codes, 
                                gift cards and many more can also be found on the website.
                            </p>
                        </div>
                        <div className="w-full border border-gray-200 p-4 text-[#555] border-t-0">
                            <p className="leading-7">
                                Q: Why should I visit Zibjr for Amyet coupons? <br />
                                A: Zibjr collects the top discounts from Amyet, even at the last minute 
                                while updating continually to ensure consumer savings. Coupons, promo codes, 
                                gift cards and many more can also be found on the website.
                            </p>
                        </div>
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
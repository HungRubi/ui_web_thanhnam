import Link from "next/link"
import Header from "../components/Header"
import SearchParamsKey from "../components/SearchParams"
import Image from "next/image"
export default function Search () {

    return (
        <>
            <Header/>
            <div className="w-full mt-10">
                <div className="container px-3 mx-auto">
                    <div className="flex items-center text-sm gap-x-2.5">
                        <Link href={"/"} className="text-[#019a04]">
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-700">Search</span>
                    </div>
                    <div className="my-5 text-2xl text-gray-700">
                        <SearchParamsKey />
                    </div>
                </div>
                <div className="container px-3 mx-auto">
                    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-5">
                        <div className="col-span-4 flex flex-wrap gap-5">
                            <div className="w-[calc(50%-10px)] bg-white border border-gray-100 shadow rounded p-3">
                                <div className="flex items-center justify-start w-full gap-x-5">
                                    <Link href={"/store/id"} className="flex-none">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={"/store/1.jpg"}
                                            alt="Logo"
                                            className="w-[90px] h-[90px] object-cover border border-gray-200"
                                        />
                                    </Link>
                                    <div className="w-full">
                                        <Link href={"/store/id"} className="text-[#019a04] text-lg">
                                            Afobrick
                                        </Link>
                                        <p className="max-w-9/10 line-clamp-3 leading-6 mt-3">
                                            Nothing feel as good as when you check out! Use this 15:21 coupon when 
                                            you shop at this store this...
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between pt-3 text-sm mt-4 border-t border-gray-200">
                                    <p className="text-gray-500">Total 2 coupons</p>
                                    <Link href={"/store/id"}>
                                        <p className="text-[#019a04]">More Afobrick coupons</p>
                                    </Link>
                                </div>
                            </div>

                            <div className="w-[calc(50%-10px)] bg-white border border-gray-100 shadow rounded p-3">
                                <div className="flex items-center justify-start w-full gap-x-5">
                                    <Link href={"/store/id"} className="flex-none">
                                        <Image
                                            width={500}
                                            height={500}
                                            src={"/store/1.jpg"}
                                            alt="Logo"
                                            className="w-[90px] h-[90px] object-cover border border-gray-200"
                                        />
                                    </Link>
                                    <div className="w-full">
                                        <Link href={"/store/id"} className="text-[#019a04] text-lg">
                                            Afobrick
                                        </Link>
                                        <p className="max-w-9/10 line-clamp-3 leading-6 mt-3">
                                            Nothing feel as good as when you check out! Use this 15:21 coupon when 
                                            you shop at this store this...
                                        </p>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-between pt-3 text-sm mt-4 border-t border-gray-200">
                                    <p className="text-gray-500">Total 2 coupons</p>
                                    <Link href={"/store/id"}>
                                        <p className="text-[#019a04]">More Afobrick coupons</p>
                                    </Link>
                                </div>
                            </div>
                            
                        </div>

                        <div className="col-span-1">
                            <div className="bg-white shadow">
                                <div className="py-4 text-center border-b border-gray-300">
                                    Related Category
                                </div>
                                <div className="w-full flex flex-col items-start text-sm text-gray">
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                    <Link href={""} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3">
                                        Adult 18 and over
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


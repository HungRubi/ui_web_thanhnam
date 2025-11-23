import Header from "../components/Header"
import Link from "next/link"
import Image from "next/image"
import Footer from "../components/Footer"

const SlugHome = () => {
    return (
        <>
            <Header/>
            <div className="w-full mt-10 mb-7">
                <div className="container px-3 mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
                    <div className="col-span-4 bg-white shadow p-4">
                        <div className="flex items-center text-sm gap-x-2.5">
                            <Link href={"/"} className="text-[#019a04]">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href={"/black_friday"} className="text-gray-700">
                                Black friday
                            </Link>
                        </div>
                        <div className="my-5 text-2xl text-gray-700">
                            Black Friday Coupons
                        </div>
                        <p className="leading-7 text-gray-700">
                            Booking a hotel is not a big deal but finding the right hotel at a reasonable price is a concern. 
                            Great facilities and affordable prices are a rare combination that we hardly get when looking for 
                            a hotel room. However, greatsreview86 is here to solve your problems by offering a multitude of 
                            coupons for luxury hotels in some of the cities that we are partnering with. Whether it&apos;s a hostel 
                            or a 5-star hotel, all hotels have exclusive deals, no matter the type. On this page, you will find great
                        </p>
                        <div className="min-h-[300px] flex items-center justify-center flex-col">
                            <Image
                                width={800}
                                height={600}
                                src={"/images/404.gif"}
                                alt="404"
                                className="max-w-[80%] w-100"
                            />
                            <p className="text-gray-400">No coupons</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-white shadow">
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
            <Footer/>
        </>
    )
}

export default SlugHome
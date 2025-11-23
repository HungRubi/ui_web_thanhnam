import Header from "@/app/components/Header"
import Link from "next/link"
import Image from "next/image"
import Footer from "@/app/components/Footer"
import NewsCard from "@/app/components/NewsCard"
const DetailNew = () => {
    return (
        <>
            <Header/>
            <section className="w-full mb-5">
                <div className="container mx-auto px-3 mt-12">
                    <div className="flex items-center justify-start gap-2 flex-col sm:flex-row">
                        <Link href={"/"} className="text-[#019a04]">
                            Blog
                            <span className="text-[#019a04]"> / </span>
                        </Link>
                        <Link href={"/blog"} className="text-[#019a04]">
                            Article about Interesting Enhancement Products for Women
                            <span className="text-[#019a04]"> / </span>
                        </Link>
                        <span className="text-gray-500">
                            Article about Interesting Enhancement Products for Women
                        </span>
                    </div>
                </div>

                <div className="container mt-4 px-3 grid grid-cols-1 md:grid-cols-4 mx-auto gap-x-4">
                    <div className="col-span-3 bg-white p-5">
                        <h1 className="mb-4 text-[28px] font-[540] text-gray-800 line-clamp-2">
                            In-Depth Review of Atk.store – ATK Gaming Gear: Is It Safe to Buy?
                        </h1>
                        <div className={`flex items-center justify-start gap-x-2.5 my-5`}>
                            <Image
                                width={300}
                                height={300}
                                alt="logo"
                                src={"/images/icon.png"}
                                className="w-10 h-10 object-cover"
                            />
                            <p className="text-sm text-gray-400">2 days ago</p>
                        </div>
                        <p className="leading-8 text-gray-700">
                            Detailed Content:
                            ATK is the online store for ATK Gaming Gear, a brand focused on high-performance gaming 
                            accessories such as mice, mechanical keyboards, and other peripherals designed for gamers. 
                            The website promotes a modern gaming lifestyle and emphasizes product quality and precision.
                            Featured Products: The store offers a variety of gaming mice, hall-effect keyboards, and 
                            accessory kits tailored for professional and casual gamers. Products are designed for comfort, 
                            speed, and accuracy. User Reviews: Many users appreciate the design, lightweight feel, and 
                            performance of ATK products. However, several buyers report issues such as delayed shipping, 
                            missing confirmation emails, or unresponsive customer support. Some customers have received 
                            defective products or experienced problems like double-clicking mice shortly after delivery.
                            Trust & Reliability: The store shows mixed reliability ratings. Some users successfully receive 
                            their orders and are satisfied
                        </p>
                    </div>
                    <div className="col-span-1 bg-white flex flex-col gap-y-5 p-2.5">
                        <p className="mb-4 text-[24px] font-[540] text-gray-800 line-clamp-2 p-2.5 ">
                            Popular Blog
                        </p>
                        <NewsCard
                            title="Shine of Diamond - The Epitome of Modern Luxury Jewelry Art"
                            img="/news/1.jpg"
                            subTitle="Discover Shine of Diamond – a luxury jewelry brand offering exquisite craftsmanship that celebrates elegance, sophistication, and individuality for the modern woman."
                            link="/blog/test"
                            isAuthor={false}
                            className="w-full! border-none! shadow-none!"
                            isSub="hidden"
                        />
                        <NewsCard
                            title="Shine of Diamond - The Epitome of Modern Luxury Jewelry Art"
                            img="/news/1.jpg"
                            subTitle="Discover Shine of Diamond – a luxury jewelry brand offering exquisite craftsmanship that celebrates elegance, sophistication, and individuality for the modern woman."
                            link="/blog/test"
                            isAuthor={false}
                            isSub="hidden"
                            className="w-full! border-none! shadow-none!"
                        />
                        <NewsCard
                            title="Shine of Diamond - The Epitome of Modern Luxury Jewelry Art"
                            img="/news/1.jpg"
                            subTitle="Discover Shine of Diamond – a luxury jewelry brand offering exquisite craftsmanship that celebrates elegance, sophistication, and individuality for the modern woman."
                            link="/blog/test"
                            isAuthor={false}
                            isSub="hidden"
                            className="w-full! border-none! shadow-none!"
                        />
                        
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default DetailNew
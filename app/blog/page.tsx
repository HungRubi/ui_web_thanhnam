import Image from "next/image"
import Search from "../components/Search"
import Link from "next/link"
import NewsCard from "../components/NewsCard"
import ListCategories from "../components/ListCategories"
import Footer from "../components/Footer"
import Header from "../components/Header"
const Blog = () => {
    return (
        <>
            <Header />
            <div className="w-full mt-10">
                <div className="container px-3 mx-auto relative overflow-hidden max-h-[370px] h-[370px]">
                    <Image
                        width={3000}
                        height={3000}
                        src="/store/1.jpg"
                        alt="blog"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 55%' }}
                    />
                    <Link 
                        href={""} 
                        className="absolute text-white w-full px-10 z-10 bg-[#0000003f] min-h-32 flex items-center justify-center flex-col left-0 bottom-0"
                    >
                        <h1 className="mb-1.5 w-full line-clamp-1 text-[32px] font-[550] text-center">
                            In-Depth Review of Atk.store – ATK Gaming Gear: Is It Safe to Buy?
                        </h1>
                        <p className="text-[22px] w-full line-clamp-1 mb-4 text-white text-center">
                            In-Depth Review of Atk.store – ATK Gaming Gear: Is It Safe to Buy?
                        </p>
                    </Link>
                </div>
            </div>
            <div className="w-full mt-10">
                <div className="container mx-auto px-3">
                    <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                        Latest Post
                    </h3>
                    <div className="w-full flex gap-2.5">
                        <NewsCard
                            title="Shine of Diamond - The Epitome of Modern Luxury Jewelry Art"
                            img="/news/1.jpg"
                            subTitle="Discover Shine of Diamond – a luxury jewelry brand offering exquisite craftsmanship that celebrates elegance, sophistication, and individuality for the modern woman."
                            link="/blog/test"
                            isAuthor={true}
                        />
                    </div>
                    <ListCategories/>
                </div>
            </div>
            <Footer/>


        </>
    )
}

export default Blog
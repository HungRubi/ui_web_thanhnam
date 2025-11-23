import Link from "next/link"
import Image from "next/image"
import Search from "./Search"

const Header = () => {
    return (
        <nav className="w-full py-2">
                <div className="container px-3 mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <Link 
                        className="col-span-1 mx-auto"
                        href={"/"}
                    >
                        <Image
                            src="/images/logo.jpg"
                            alt="test"
                            width={300}
                            height={250}
                            className="h-[65px] object-cover"
                        />
                    </Link>
                    <div className="col-span-3">
                        <Search />
                    </div>
                </div>
            </nav>
    )
}

export default Header
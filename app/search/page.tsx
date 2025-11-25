import Link from "next/link"
import Header from "../components/Header"
import { useSearchParams } from "next/navigation"

export default function Search () {
    const searchParams = useSearchParams()
    const search = searchParams.get("search")

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
                        Search Results for key &quot;{search}&quot;
                    </div>
                </div>
                <div className="container px-3 mx-auto">
                    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-5">
                        <div className="col-span-4 flex flex-wrap">
                            <div className="w-1/2">
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


"use client";

import Link from "next/link"
import Image from "next/image"
import Search from "./Search"
import { useGlobalConfig } from "@/hooks/useGlobalConfig"

const Header = () => {
    const { data: globalConfig } = useGlobalConfig();
    
    const logoUrl = globalConfig?.logo 
        ? `${process.env.NEXT_PUBLIC_API_URL}/${globalConfig.logo}` 
        : "/images/logo.jpg";

    return (
        <nav className="w-full py-2">
                <div className="container px-3 mx-auto grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                    <Link 
                        className="col-span-1 mx-auto"
                        href={"/"}
                    >
                        <Image
                            src={logoUrl}
                            alt={globalConfig?.nameCompany || "Logo"}
                            width={300}
                            height={250}
                            className="h-[65px] object-cover"
                            unoptimized
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
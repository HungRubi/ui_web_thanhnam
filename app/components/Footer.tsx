 "use client";

import Link from "next/link";
import FacebookIcon from "@/utils/sgv/Facebook";
import TwitterIcon from "@/utils/sgv/Twitter";
import InstagramIcon from "@/utils/sgv/Instagram";
import PinterestIcon from "@/utils/sgv/Pinterest";
import { useEvents } from "@/hooks/useEvents";
import { useSocial } from "@/hooks/useSocial";

const Footer = () => {
    const { events, loading, error } = useEvents();
    const { social, loading: socialLoading } = useSocial();
    const featuredEvents = events
        .filter((event) => event.hienthi !== false)
        .slice(0, 6);

    return (
        <div className="w-full bg-[#095400] min-h-[265px]">
            <div className="container mx-auto px-3 
                grid 
                grid-cols-1
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-5 
                gap-2.5"
            >
                <div className="col-span-1 mt-8 mb-4">
                    <h3 className="font-medium text-gray-300 text-sm">
                        Event Sales
                    </h3>
                    <ul className="list-none mt-4">
                        {loading ? (
                            <li className="mb-2 text-sm text-gray-200">Đang tải event...</li>
                        ) : error ? (
                            <li className="mb-2 text-sm text-red-200">Lỗi: {error}</li>
                        ) : featuredEvents.length > 0 ? (
                            featuredEvents.map((event) => (
                                <li key={event._id || event.slug} className="mb-2">
                                    <Link
                                        href={`/${event.slug}`}
                                        className="text-white hover:text-red-500 transition text-sm"
                                    >
                                        {event.tendanhmuc}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="mb-2 text-sm text-gray-200">Chưa có event nào</li>
                        )}
                    </ul>
                </div>

                <div className="col-span-1 mt-8 mb-4">
                    <h3 className="font-medium text-gray-300 text-sm">
                        Resources
                    </h3>
                    <ul className="list-none mt-4">
                        <li className="mb-2">
                            <Link href="/" className="text-white hover:text-red-500 transition text-sm">
                                Product Feed
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/" className="text-white hover:text-red-500 transition text-sm">
                               Best Rated Product
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/" className="text-white hover:text-red-500 transition text-sm">
                                Feature Product
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-span-1 mt-8 mb-4">
                    <h3 className="font-medium text-gray-300 text-sm">
                        Company
                    </h3>
                    <ul className="list-none mt-4">
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                                About Us
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                               Contact Us
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                                Help Center
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                                Press
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/blog" className="text-white hover:text-red-500 transition text-sm">
                                Blog
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-span-1 mt-8 mb-4">
                    <h3 className="font-medium text-gray-300 text-sm">
                        Notices
                    </h3>
                    <ul className="list-none mt-4">
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                                Terns Of Use
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                               Privacy Policy
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                                Disclosure Policy
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link href="/page/welcome-to-sshub999-coupons" className="text-white hover:text-red-500 transition text-sm">
                                Cookie Policy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="col-span-1 mt-8 mb-4">
                    <h3 className="font-medium text-gray-300 text-sm">
                        Follow Us On
                    </h3>
                    <div className="mt-4 flex items-center gap-2.5">
                        {social?.facebook && (
                            <Link href={social.facebook} target="_blank" rel="noopener noreferrer">
                                <FacebookIcon/>
                            </Link>
                        )}
                        {social?.twitter && (
                            <Link href={social.twitter} target="_blank" rel="noopener noreferrer">
                                <TwitterIcon/>
                            </Link>
                        )}
                        {social?.instagram && (
                            <Link href={social.instagram} target="_blank" rel="noopener noreferrer">
                                <InstagramIcon/>
                            </Link>
                        )}
                        {social?.pinterest && (
                            <Link href={social.pinterest} target="_blank" rel="noopener noreferrer">
                                <PinterestIcon/>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
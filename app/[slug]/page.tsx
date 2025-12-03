 "use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEvents } from "@/hooks/useEvents";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCategories } from "@/store/categorySlice";

const SlugHome = () => {
    const params = useParams();
    const slug = (params?.slug as string) || "";

    // Lấy danh sách event từ API / Redux
    const { events, loading: eventsLoading, error: eventsError } = useEvents();

    const currentEvent = useMemo(
        () => events.find((item) => item.slug === slug),
        [events, slug]
    );

    // Lấy categories cho phần Related Category
    const dispatch = useAppDispatch();
    const { categories, loading: categoriesLoading } = useAppSelector((state) => state.category);

    useEffect(() => {
        if (!categories.length) {
            dispatch(getCategories());
        }
    }, [categories.length, dispatch]);

    // Loading / error cho event
    if (eventsLoading) {
        return (
            <>
                <Header />
                <div className="w-full min-h-[60vh] flex items-center justify-center">
                    <p className="text-gray-500">Đang tải event...</p>
                </div>
                <Footer />
            </>
        );
    }

    if (eventsError || !currentEvent) {
        return (
            <>
                <Header />
                <div className="w-full min-h-[60vh] flex items-center justify-center">
                    <p className="text-red-500">
                        {eventsError || "Không tìm thấy event"}
                    </p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="w-full mt-10 mb-7">
                <div className="container px-3 mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
                    <div className="col-span-4 bg-white shadow p-4">
                        <div className="flex items-center text-sm gap-x-2.5">
                            <Link href={"/"} className="text-[#019a04]">
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-gray-700">
                                {currentEvent.tendanhmuc}
                            </span>
                        </div>
                        <div className="my-5 text-2xl text-gray-700 font-semibold">
                            {currentEvent.tendanhmuc} Coupons
                        </div>
                        {currentEvent.mota && (
                            <p className="leading-7 text-gray-700">
                                {currentEvent.mota}
                            </p>
                        )}
                        {!currentEvent.mota && (
                            <p className="leading-7 text-gray-700">
                                Thông tin về event đang được cập nhật. Vui lòng quay lại sau.
                            </p>
                        )}
                        <div className="min-h-[300px] flex items-center justify-center flex-col mt-6">
                            <Image
                                width={800}
                                height={600}
                                src={"/images/404.gif"}
                                alt={currentEvent.tendanhmuc}
                                className="max-w-[80%] w-100"
                            />
                            <p className="text-gray-400 mt-2">No coupons</p>
                        </div>
                    </div>
                    <div className="col-span-1 bg-white shadow">
                        <div className="py-4 text-center border-b border-gray-300">
                            Related Category
                        </div>
                        <div className="w-full flex flex-col items-start text-sm text-gray">
                            {categoriesLoading && (
                                <p className="p-3 text-gray-400">Đang tải category...</p>
                            )}
                            {!categoriesLoading && categories.length === 0 && (
                                <p className="p-3 text-gray-400">Không có category</p>
                            )}
                            {!categoriesLoading &&
                                categories.slice(0,15).map((cat) => (
                                    <Link
                                        key={cat._id || cat.slug}
                                        href={`/search?category=${cat.slug}`}
                                        className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3 w-full"
                                    >
                                        {cat.tendanhmuc}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SlugHome;
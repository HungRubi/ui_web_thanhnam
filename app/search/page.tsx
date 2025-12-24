import Link from "next/link"
import Header from "../components/Header"
import SearchParamsKey from "../components/SearchParams"
import Image from "next/image"
import { resolveImageUrl } from "@/utils/image";
import Footer from "../components/Footer";
import RelatedCategories from "../components/RelatedCategories";

type Props = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>
}

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000").replace(/\/$/, "");

export default async function Search({ searchParams }: Props) {
    const sp = searchParams ? await searchParams : {};
    const rawQ = sp?.timkiem;
    const query = Array.isArray(rawQ) ? (rawQ[0] || "") : (rawQ || "");
    const qTrim = typeof query === 'string' ? query.trim() : "";
    const rawCat = sp?.category;
    const category = Array.isArray(rawCat) ? (rawCat[0] || "") : (rawCat || "");
    const catTrim = typeof category === 'string' ? category.trim() : "";

    let stores: any[] = [];
    let totalPage = 0;
    let searchType = false;
    // page from query string (client-requested)
    const rawP = sp?.page;
    const page = Math.max(1, parseInt(Array.isArray(rawP) ? (rawP[0] as string) : (rawP as string) || "1", 10) || 1);

    if (qTrim || catTrim) {
        try {
            const qs = qTrim ? `timkiem=${encodeURIComponent(qTrim)}` : `category=${encodeURIComponent(catTrim)}`;
            const pageQS = page ? `&page=${page}` : "";
            const res = await fetch(`${API_BASE}/store?${qs}${pageQS}`, { cache: 'no-store' });
            if (res.ok) {
                const json = await res.json();
                const data = json.data || {};
                // backend returns the full matching list in `searchStore` or `storeFormat`
                stores = data.searchStore || data.storeFormat || [];
                totalPage = data.totalPage || 0;
                searchType = !!data.searchType;
            } else {
                console.error('Search API error', res.status);
            }
        } catch (err) {
            console.error('Error fetching search results:', err);
        }
    }

    return (
        <>
            <Header/>
            <div className="w-full my-10">
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
                    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-5 max-[500px]:relative">
                        <div className="col-span-4 flex flex-wrap gap-5 max-[500px]:col-span-5">
                            {qTrim && stores.length === 0 && (
                                <div className="w-full py-10 text-center text-gray-500">No results for &quot;{qTrim}&quot;</div>
                            )}

                            {
                                // paginate client-side with 8 items per page
                                (() => {
                                    const perPage = 8;
                                    const totalItems = stores.length;
                                    const totalPagesComputed = Math.max(1, Math.ceil(totalItems / perPage));
                                    const currentPage = Math.min(page, totalPagesComputed);
                                    const start = (currentPage - 1) * perPage;
                                    const paged = stores.slice(start, start + perPage);

                                    return paged.length > 0 ? paged.map((store) => (
                                        <div key={store._id} className="w-[calc(50%-10px)] bg-white border border-gray-100 shadow rounded p-3 max-[500px]:w-full">
                                            <div className="flex items-center justify-start w-full gap-x-5">
                                                <Link href={`/store/${store.slug}`} className="flex-none">
                                                    <Image
                                                        width={500}
                                                        height={500}
                                                        src={resolveImageUrl(store.image, { fallback: "/store/1.jpg" })}
                                                        alt={store.tenstore}
                                                        className="w-[90px] h-[90px] object-cover border border-gray-200"
                                                        unoptimized
                                                    />
                                                </Link>
                                                <div className="w-full">
                                                    <Link href={`/store/${store.slug}`} className="text-[#019a04] text-lg">
                                                        {store.tenstore}
                                                    </Link>
                                                    {store.motangan && (
                                                        <p className="max-w-9/10 line-clamp-3 leading-6 mt-3">
                                                            {store.motangan}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center justify-between pt-3 text-sm mt-4 border-t border-gray-200">
                                                <p className="text-gray-500">Total {store.totalCoupons || 0} coupons</p>
                                                <Link href={`/store/${store.slug}`}>
                                                    <p className="text-[#019a04]">More {store.tenstore} coupons</p>
                                                </Link>
                                            </div>
                                        </div>
                                        )) : (
                                            <p className="text-center italic mt-20">Not found store</p>
                                        );
                                })()
                            }

                            {/* Pagination controls */}
                            {stores.length > 8 && (
                                (() => {
                                    const perPage = 8;
                                    const totalItems = stores.length;
                                    const totalPagesComputed = Math.max(1, Math.ceil(totalItems / perPage));
                                    const pages = Array.from({ length: totalPagesComputed }, (_, i) => i + 1);
                                    return (
                                        <div className="w-full flex items-center justify-center gap-2 mt-6">
                                            {page > 1 && (
                                                <Link
                                                    href={`/search?timkiem=${encodeURIComponent(qTrim)}&page=${page - 1}`}
                                                    className="px-3 py-1 border border-gray-300 text-green-600 rounded"
                                                >
                                                    Prev
                                                </Link>
                                            )}
                                            {pages.map((p) => (
                                                <Link
                                                    key={p}
                                                    href={`/search?timkiem=${encodeURIComponent(qTrim)}&page=${p}`}
                                                    className={`px-3 py-1 border border-gray-300 text-green-600 rounded ${p === page ? 'bg-[#019a04] text-white' : ''}`}
                                                >
                                                    {p}
                                                </Link>
                                            ))}
                                            {page < totalPagesComputed && (
                                                <Link
                                                    href={`/search?timkiem=${encodeURIComponent(qTrim)}&page=${page + 1}`}
                                                    className="px-3 py-1 border border-gray-300 text-green-600 rounded"
                                                >
                                                    Next
                                                </Link>
                                            )}
                                        </div>
                                    );
                                })()
                            )}

                        </div>

                        <div className="col-span-1 max-[500px]:col-span-5">
                            {/* Related categories loaded client-side via Redux */}
                            <RelatedCategories />
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}


import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import RelatedCategories from "@/app/components/RelatedCategories";
import Link from "next/link";
import { fetchCategoryBySlug } from "@/lib/categoryApi";

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const slug = params?.slug;
    const data = await fetchCategoryBySlug(slug);
    const category = data?.category
    if (!data) {
        return (
            <>
                <Header />
                <div className="container mx-auto px-3 py-10">
                    <h1 className="text-2xl font-bold text-red-600">Category not found</h1>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="w-full my-10">
                <div className="container px-3 mx-auto">
                    <div className="flex items-center text-sm gap-x-2.5">
                        <Link href="/" className="text-[#019a04]">Home</Link>
                        <span>/</span>
                        <Link href="/category" className="text-[#019a04]">Category</Link>
                        <span>/</span>
                        <span className="text-gray-700">{category?.tendanhmuc}</span>
                    </div>
                    <div className="my-5">
                        <h1 className="text-3xl font-bold text-[#019a04] mb-4">{category?.tendanhmuc}</h1>
                        {category?.mota && (
                            <p className="text-gray-700 mb-6 text-lg">{category.mota}</p>
                        )}
                    </div>
                </div>
                <div className="container px-3 mx-auto">
                    <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-5">
                        <div className="col-span-4 flex flex-wrap gap-5">
                            {data.stores && data.stores.length > 0 ? (
                                data.stores.map((store) => (
                                    <div key={store._id} className="w-[calc(50%-10px)] max-h-48 bg-white border border-gray-100 shadow rounded p-3">
                                        <div className="flex items-center justify-start w-full gap-x-5">
                                            <Link href={`/store/${store.slug}`} className="flex-none">
                                                <Image
                                                    width={90}
                                                    height={90}
                                                    src={`${process.env.NEXT_PUBLIC_API_URL}/${store.image}` || "/store/1.jpg"}
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
                                ))
                            ) : (
                                <p className="text-center italic mt-20">No stores found for this category.</p>
                            )}
                        </div>
                        <div className="col-span-1">
                            <RelatedCategories />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

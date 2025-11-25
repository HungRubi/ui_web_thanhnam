"use client";

import Link from "next/link";
import { useCategories } from "@/hooks/useCategories";

const ListCategories = () => {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return (
            <div className="w-full mb-7">
                <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                    All Categories
                </h3>
                <div className="w-full flex items-center flex-wrap gap-2.5">
                    <div className="px-2.5 py-1.5 bg-gray-200 rounded border border-gray-300 text-gray-400 animate-pulse">
                        Đang tải...
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full mb-7">
                <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                    All Categories
                </h3>
                <div className="w-full flex items-center flex-wrap gap-2.5">
                    <p className="text-red-500 text-sm">Lỗi: {error}</p>
                </div>
            </div>
        );
    }

    // Lọc chỉ hiển thị categories có hienthitrangchu = true và sắp xếp theo sapxep
    const displayCategories = categories
        .filter(cat => cat.hienthitrangchu !== false && cat.hienthi !== false)
        .sort((a, b) => (a.sapxep || 0) - (b.sapxep || 0));

    if (displayCategories.length === 0) {
        return (
            <div className="w-full mb-7">
                <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                    All Categories
                </h3>
                <div className="w-full flex items-center flex-wrap gap-2.5">
                    <p className="text-gray-500 text-sm">Chưa có danh mục nào</p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full mb-7">
            <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                All Categories
            </h3>
            <div className="w-full flex items-center flex-wrap gap-2.5">
                {displayCategories.map((category) => (
                    <Link
                        key={category._id}
                        href={`/category/${category.slug}`}
                        className="px-2.5 py-1.5 bg-white rounded border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors"
                    >
                        {category.tendanhmuc}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ListCategories;
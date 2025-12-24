"use client";

import Link from "next/link";
import { useAppSelector } from "@/store/hooks";

export default function RelatedCategories() {
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.category);

  return (
    <div className="col-span-1 bg-white shadow">
      <div className="py-4 text-center border-b border-gray-300">Related Category</div>
      <div className="w-full flex flex-col items-start text-sm text-gray">
        {categoriesLoading && <p className="p-3 text-gray-400">Đang tải category...</p>}
        {!categoriesLoading && categories.length === 0 && <p className="p-3 text-gray-400">Không có category</p>}
        {!categoriesLoading && categories.slice(0, 15).map((cat: any) => (
          <Link key={cat._id || cat.slug} href={`/search?category=${cat.slug}`} className="p-3 hover:text-[#019a04] transition-all duration-700 hover:translate-x-3 w-full">
            {cat.tendanhmuc}
          </Link>
        ))}
      </div>
    </div>
  );
}

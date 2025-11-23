import Link from "next/link"

const ListCategories = () => {
    return  (
        <div className="w-full mb-7">
            <h3 className="pb-2 pt-12 text-[28px] text-gray-700">
                All Categories
            </h3>
            <div className="w-full flex items-center flex-wrap gap-2.5">
                <Link
                    href={"#"}
                    className="px-2.5 py-1.5 bg-white rounded border border-gray-300 text-gray-700"
                >
                    Article about Interesting Enhancement Products for Women
                </Link>

                <Link
                    href={"#"}
                    className="px-2.5 py-1.5 bg-white rounded border border-gray-300 text-gray-700"
                >
                    Article about Interesting Enhancement Products for Women
                </Link>
                <Link
                    href={"#"}
                    className="px-2.5 py-1.5 bg-white rounded border border-gray-300 text-gray-700"
                >
                    Article about Interesting Enhancement Products for Women
                </Link>
                <Link
                    href={"#"}
                    className="px-2.5 py-1.5 bg-white rounded border border-gray-300 text-gray-700"
                >
                    Article about Interesting Enhancement Products for Women
                </Link>
            </div>
        </div>
    )
}

export default ListCategories
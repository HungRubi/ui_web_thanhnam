import { Metadata } from "next";
import { fetchCategoryBySlug } from "@/lib/categoryApi";

export async function generateMetadata(
    props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await props.params;

    const data = await fetchCategoryBySlug(slug);

    // Kiểm tra sớm
    if (!data || !data.category) {
        return {
        title: "Category not found",
        description: ""
        };
    }

    const category = data.category;

    return {
        title: category.metatitle || category.tendanhmuc,
        description: category.metadescription || category.mota || ""
    };
}


export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

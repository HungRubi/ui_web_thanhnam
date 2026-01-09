"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Loader from "@/app/components/Loader";
import Link from "next/link";
import Image from "next/image";
import ModalCoupon from "@/app/components/ModalCoupon";
import { useStoreBySlug, useStores } from "@/hooks/useStores";
import { useParams } from "next/navigation";
import { resolveImageUrl } from "@/utils/image";
import { useContentConfig } from "@/hooks/useContentConfig";
import { useMemo } from "react";
import StoreSidebar from "./StoreSidebar";

const getImageUrl = (imagePath?: string): string => {
  return resolveImageUrl(imagePath, { fallback: "/store/1.jpg" });
};

const formatTemplateContent = (template: string, storeName: string, siteName: string) => {
  if (!template) return "";
  const replaced = template.replace(/{{\s*store_name\s*}}/gi, storeName).replace(/{{\s*site_name\s*}}/gi, siteName).trim();
  if (!replaced) return "";
  const lines = replaced.split(/\n+/).map((l) => l.trim()).filter((l) => l.length > 0);
  if (lines.length === 0) return `<p>${replaced}</p>`;
  const paragraphs = lines.map((line) => `<p>${line}</p>`);
  return paragraphs.join("");
};

export default function StoreContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const { store, offers, loading, error } = useStoreBySlug(slug);
  const { data: contentConfig } = useContentConfig();
  const siteName = contentConfig?.name || "Our site";
  const storeName = store?.tenstore || "";
  const { stores: apiStores } = useStores();

  const formattedHowToApply = useMemo(() => {
    if (!storeName) return store?.howtoapply || "";
    if (store?.howtoapply) return store.howtoapply;
    if (contentConfig?.howToApply) return formatTemplateContent(contentConfig.howToApply, storeName, siteName);
    return "";
  }, [store?.howtoapply, storeName, contentConfig?.howToApply, siteName]);

  const formattedFaqs = useMemo(() => {
    if (!storeName) return store?.faqs || "";
    if (store?.faqs) return store.faqs;
    if (contentConfig?.FAQs) return formatTemplateContent(contentConfig.FAQs, storeName, siteName);
    return "";
  }, [store?.faqs, storeName, contentConfig?.FAQs, siteName]);

  if (loading) return <div className="w-full min-h-screen flex items-center justify-center"><Loader/></div>;
  if (error || !store) return <div className="w-full min-h-screen flex items-center justify-center"><Loader/></div>;

  const storeImageSrc = getImageUrl(store.image);
  const isExternalImage = storeImageSrc.startsWith("http://") || storeImageSrc.startsWith("https://");

  return (
    <>
      <Header />
      <div className="w-full">
        <div className="container px-3 mx-auto mt-12 grid grid-cols-4 sm:grid-cols-4 gap-x-7">
          <StoreSidebar store={store} offers={offers} />

          <div className="col-span-3 max-[435px]:mx-auto max-[435px]:w-full max-[435px]:col-span-full">
            <h3 className="text-[28px] font-semibold pb-3 leading-7 w-full text-gray-700 max-[435px]:text-xl">{store.tenstore} Coupons and Promo Codes</h3>
            {store.motangan && <div className="mb-6 line-clamp-2 tracking-wide">{store.motangan}</div>}

            <div className="mb-5 w-full flex items-center gap-x-2.5">
              <div className="px-6 py-2 rounded-md font-bold shadow cursor-pointer bg-[#019a04] text-white transition">All ({offers.length})</div>
            </div>

            {offers && offers.length > 0 ? (
              offers.map((o: any, i: number) => (
                <div key={o._id || i} className="w-full bg-white flex p-2.5 min-h-[130px] max-[450px]:flex-col items-center mb-4 shadow rounded">
                  <div className="flex items-center">
                    <div className="w-[110px] flex-none h-[130px] flex items-center border-r border-dashed" style={{ borderColor: "#e7e7e7" }}>
                      <p className="text-[22px] font-black text-[#019a04]">{o.offer || "Deal"}</p>
                    </div>
                    <div className="w-full flex flex-col justify-start h-[130px] ml-2.5">
                      <p className="text-[#019a04] font-bold  truncate">{o.verified === "Yes" ? "Verified Code" : "Deal"}</p>
                      <h2 className="text-xl font-bold text-gray-700 my-4 max-[450px]:my-2 line-clamp-1">
                        <Link href={o.url || "#"} target={o.url ? "_blank" : undefined}>{o.name || o.description || `Offer ${i + 1}`}</Link>
                      </h2>
                      <p className="min-w-9/10 text-sm text-gray-600 tracking-wide line-clamp-2">{o.description || "No description available."}</p>
                    </div>
                  </div>
                  <div className="w-[235px] flex-none flex justify-center max-[450px]:ml-10">
                    <ModalCoupon btn={1} offers={offers} store={store} selectedOfferIndex={i} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full italic">No coupon not found</div>
            )}

            {store.about && (
              <>
                <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">About store</h2>
                <div className="w-full border border-gray-200 p-4 text-[#555]"><div className="mb-4 leading-7" dangerouslySetInnerHTML={{ __html: store.about }} /></div>
              </>
            )}

            {formattedHowToApply && (
              <>
                <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">How to apply {store.tenstore} coupon codes</h2>
                <div className="w-full border border-gray-200 p-4 text-[#555]"><div className="mb-4 leading-7" dangerouslySetInnerHTML={{ __html: formattedHowToApply }} /></div>
              </>
            )}

            {formattedFaqs && (
              <>
                <h2 className="text-2xl text-gray-700 font-semibold mt-10 mb-4">{store.tenstore} Questions & Answers</h2>
                <div className="w-full border border-gray-200 p-4 text-[#555]"><div className="leading-7" dangerouslySetInnerHTML={{ __html: formattedFaqs }} /></div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full mt-5 mb-10">
        <div className="container mx-auto px-3">
          <h3 className="pb-2 pt-12 text-[28px] text-gray-700">Popular Brands</h3>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 text-[#019a04]">
            <div className="col-span-1 flex flex-col">{apiStores?.slice(0,5).map((item: any) => (<Link href={`/store/${item.slug}`} key={item._id}>{item.tenstore}</Link>))}</div>
            <div className="col-span-1 flex flex-col">{apiStores?.slice(5,10).map((item: any) => (<Link href={`/store/${item.slug}`} key={item._id}>{item.tenstore}</Link>))}</div>
            <div className="col-span-1 flex flex-col">{apiStores?.slice(10,15).map((item: any) => (<Link href={`/store/${item.slug}`} key={item._id}>{item.tenstore}</Link>))}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

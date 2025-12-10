"use client";

import ProductCard from "./ProductCard";
import { resolveImageUrl } from "@/utils/image";
import { useDeals } from "@/hooks/useDeals";

export default function Deals() {
  const { deals, loading } = useDeals();
  const displayDeals = deals.filter(d => d.duyet === "Yes").slice(0, 6);

  if (loading) return <p>Loading ... </p>;
  if (displayDeals.length === 0) return <p>No deals available</p>;

  const handleDealClick = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-full flex flex-wrap gap-2.5">
      {displayDeals.map((deal) => (
        <ProductCard
          key={deal._id}
          title={deal.name}
          img={resolveImageUrl(deal.image, { fallback: "/products/1.png" })}
          oldPrice={deal.originalPrice}
          newPrice={deal.price || 0}
          onDeal={() => handleDealClick(deal.url)}
          disabled={!deal.url}
        />
      ))}
    </div>
  );
}

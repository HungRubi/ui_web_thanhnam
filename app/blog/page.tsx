"use client";

import Footer from "../components/Footer";
import Header from "../components/Header";
import { useNews } from "@/hooks/useNews";
import FeaturedNews from "./FeaturedNews";
import LatestNews from "./LatestNews";

const Blog = () => {
  const { news, loading, error } = useNews();

  const featuredNews = news.filter((item: any) => item.duyet === "Yes")[0];
  const latestNews = news.filter((item: any) => item.duyet === "Yes").slice(1);

  return (
    <>
      <Header />
      {featuredNews && <FeaturedNews featuredNews={featuredNews} />}
      <LatestNews latestNews={latestNews} loading={loading} error={error} />
      <Footer />
    </>
  );
};

export default Blog;
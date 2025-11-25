"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getNews, getNewsById } from "@/store/newsSlice";

/**
 * Hook để lấy và sử dụng news
 * @param autoFetch - Tự động fetch khi component mount (default: true)
 * @param searchQuery - Query để search news (optional)
 * @returns { news, searchNews, loading, error, refetch, searchType, totalPage }
 */
export const useNews = (autoFetch: boolean = true, searchQuery?: string) => {
  const dispatch = useAppDispatch();
  const { news, searchNews, loading, error, searchType, totalPage } = useAppSelector(
    (state) => state.news
  );

  useEffect(() => {
    if (autoFetch) {
      dispatch(getNews(searchQuery));
    }
  }, [autoFetch, searchQuery, dispatch]);

  const refetch = (query?: string) => {
    dispatch(getNews(query));
  };

  // Trả về news phù hợp dựa trên searchType
  const displayNews = searchType ? searchNews : news;

  return {
    news: displayNews,
    searchNews,
    loading,
    error,
    refetch,
    searchType,
    totalPage,
  };
};

/**
 * Hook để lấy news theo id
 * @param id - ID của news
 * @param autoFetch - Tự động fetch khi component mount (default: true)
 * @returns { news, loading, error, refetch }
 */
export const useNewsById = (id: string, autoFetch: boolean = true) => {
  const dispatch = useAppDispatch();
  const { currentNews, loading, error } = useAppSelector((state) => state.news);

  useEffect(() => {
    if (autoFetch && id) {
      dispatch(getNewsById(id));
    }
  }, [autoFetch, id, dispatch]);

  const refetch = () => {
    if (id) {
      dispatch(getNewsById(id));
    }
  };

  return {
    news: currentNews,
    loading,
    error,
    refetch,
  };
};


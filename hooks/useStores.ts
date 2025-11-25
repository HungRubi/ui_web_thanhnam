"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getStores, getStoreBySlug } from "@/store/storeSlice";

/**
 * Hook để lấy và sử dụng stores
 * @param autoFetch - Tự động fetch khi component mount (default: true)
 * @param searchQuery - Query để search stores (optional)
 * @returns { stores, searchStores, loading, error, refetch, searchType, totalPage }
 */
export const useStores = (autoFetch: boolean = true, searchQuery?: string) => {
  const dispatch = useAppDispatch();
  const { stores, searchStores, loading, error, searchType, totalPage } = useAppSelector(
    (state) => state.store
  );

  useEffect(() => {
    if (autoFetch) {
      dispatch(getStores(searchQuery));
    }
  }, [autoFetch, searchQuery, dispatch]);

  const refetch = (query?: string) => {
    dispatch(getStores(query));
  };

  // Trả về stores phù hợp dựa trên searchType
  const displayStores = searchType ? searchStores : stores;

  return {
    stores: displayStores,
    searchStores,
    loading,
    error,
    refetch,
    searchType,
    totalPage,
  };
};

/**
 * Hook để lấy store theo slug
 * @param slug - Slug của store
 * @param autoFetch - Tự động fetch khi component mount (default: true)
 * @returns { store, loading, error, refetch }
 */
export const useStoreBySlug = (slug: string, autoFetch: boolean = true) => {
  const dispatch = useAppDispatch();
  const { currentStore, loading, error } = useAppSelector((state) => state.store);

  useEffect(() => {
    if (autoFetch && slug) {
      dispatch(getStoreBySlug(slug));
    }
  }, [autoFetch, slug, dispatch]);

  const refetch = () => {
    if (slug) {
      dispatch(getStoreBySlug(slug));
    }
  };

  return {
    store: currentStore,
    loading,
    error,
    refetch,
  };
};


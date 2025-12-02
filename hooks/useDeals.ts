"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getDeals } from "@/store/dealSlice";

export const useDeals = (autoFetch: boolean = true, searchQuery?: string) => {
  const dispatch = useAppDispatch();
  const { deals, searchDeals, loading, error, searchType, totalPage } =
    useAppSelector((state) => state.deal);

  useEffect(() => {
    if (autoFetch) {
      dispatch(getDeals(searchQuery));
    }
  }, [autoFetch, searchQuery, dispatch]);

  const refetch = (query?: string) => {
    dispatch(getDeals(query));
  };

  const displayDeals = searchType ? searchDeals : deals;

  return {
    deals: displayDeals,
    searchDeals,
    loading,
    error,
    refetch,
    searchType,
    totalPage,
  };
};






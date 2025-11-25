"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getGlobalConfig } from "@/store/globalConfigSlice";

/**
 * Hook để lấy và sử dụng global config
 * @param autoFetch - Tự động fetch khi component mount (default: true)
 * @returns { data, loading, error, refetch }
 */
export const useGlobalConfig = (autoFetch: boolean = true) => {
  const dispatch = useAppDispatch();
  const { data, loading, error } = useAppSelector((state) => state.globalConfig);

  useEffect(() => {
    if (autoFetch && !data && !loading) {
      dispatch(getGlobalConfig());
    }
  }, [autoFetch, data, loading, dispatch]);

  const refetch = () => {
    dispatch(getGlobalConfig());
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};


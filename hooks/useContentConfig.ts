"use client";

import { useEffect, useState } from "react";
import { ContentConfig, fetchContentConfig } from "@/lib/api";

export const useContentConfig = (autoFetch: boolean = true) => {
  const [data, setData] = useState<ContentConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchContentConfig();
      setData(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch content config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && !data && !loading) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoFetch]);

  const refetch = () => {
    if (!loading) {
      load();
    }
  };

  return {
    data,
    loading,
    error,
    refetch,
  };
};



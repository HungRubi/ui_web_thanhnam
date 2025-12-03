import { useEffect, useState } from "react";

export interface Widget {
  _id?: string;
  name: string;
  link?: string;
  sapxep?: string;
  vitri?: string;
  stt?: number;
  image?: string;
  hienthi?: "Yes" | "No";
  description?: string;
}

export function useWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/widget");
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const result = await res.json();
        // Extract from data.widgetFormat or data.data.widgetFormat
        const widgetList = result.data?.widgetFormat || result.widgetFormat || [];
        setWidgets(Array.isArray(widgetList) ? widgetList : []);
      } catch (err) {
        console.error("Error fetching widgets:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch widgets");
        setWidgets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWidgets();
  }, []);

  return { widgets, loading, error };
}

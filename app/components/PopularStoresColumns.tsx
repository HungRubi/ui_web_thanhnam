"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useStores } from '@/hooks/useStores';

function PopularStoresColumns() {
  const { stores } = useStores();

  // pick top 9 stores (or fewer) and split into 3 columns to preserve layout
  const columns = useMemo(() => {
    const list = (stores || []).slice(0, 9);
    const cols: any[][] = [[], [], []];
    list.forEach((s: any, i: number) => {
      cols[i % 3].push(s);
    });
    return cols;
  }, [stores]);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-3 text-[#019a04]">
      {columns.map((col, ci) => (
        <div key={`col-${ci}`} className="col-span-1 flex flex-col">
          {col.map((s: any) => (
            <Link key={s._id || s.slug} href={`/store/${s.slug}`} className="py-1 block hover:underline">
              {s.tenstore}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default React.memo(PopularStoresColumns);
